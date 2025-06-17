import { initializePayment, verifyTransaction } from "@/services/paystack.service"
import { Request, Response } from "express"
import User from "@/models/user"
import Transaction from "@/models/transaction" 
import logger from "@/utils/logger"

async function fundWallet(req: Request, res: Response): Promise<any> {
  logger.info("Fund Wallet Endpoint Hit")
  const { email, amount } = req.body
  
  if(!email || !amount) {
    return res.status(422).json({ status: "error", message: "email and amount are required"})
  }
  logger.info(email, amount)
  
  if(amount < 100 && typeof amount != "number") {
    logger.debug("Invalid amount", amount)
    return res.status(400).json({ status: "error", message: "Invalid amount. amount cannot be less than 100"})
  }
  const reference = `SAMS_VTU_${Date.now()}_${Math.floor(Math.random() * 1000)}`
  const initData = await initializePayment(amount, email, reference)
  try{
  if(!initData.authorization_url) {
    logger.info("Failed to initialize funding", initData.authorization_url)
    return res.status(500).json({ status: "error", message: "failed to intilaized funding"})
  }
  await Transaction.create({
    user: req?.user?._id,
    type: "deposit",
    amount,
    reference,
    status: "pending"
  })
    logger.info("authorization_url:", initData.authorization_url)
    return res.status(200).json({ status: "success", message: "payment intilaized successfully", authorization_url: initData.authorization_url})
  } catch(error) {
    logger.error("Failed to initialize funding", error)
    return res.status(500).json({ status: "error", message: "internal server error"})
  }
}

async function handlePaystackWebHook(req: Request, res: Response): Promise<any> {
  try {
    logger.info("Paystack webhook Endpoint Hit")
    const event = req.body
    logger.info(req.body)
    
   if(event.event === "charge.success") {
      const reference = event.data.reference
      const amountFunded = event.data.amount / 100
      
      const transaction = await Transaction.findOne({ reference })
      if(!transaction){
        return res.status(404).json({ status: "error", message: "transaction not found"})
      }
      
    if(transaction.status ===  "success") return res.sendStatus(200)
    const user = await User.findById(transaction.user)
    
    if(!user) {
      return res.status(404).json({ status: "error", message: "user not found"})
    }
    
    user.wallet_balance += amountFunded
    transaction.status = "success"
    
    await Promise.all([ user.save(), transaction.save() ])
    logger.info(`Wallet Funded Successfully N${amountFunded} to ${user.email}`)
    return res.sendStatus(200)
    }
  } catch(error) {
    logger.error("Payment Webhook error:", error)
    res.sendStatus(500)
  }
}

export { fundWallet, handlePaystackWebHook} 