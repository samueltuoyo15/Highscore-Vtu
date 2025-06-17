import dotenv from "dotenv"
dotenv.config()
import axios from "axios"
import logger from "@/utils/logger"

interface paymentParams {
  amount: number
  email: string
  reference: string
}

async function initializePayment({ amount , email, reference } : paymentParams) {
  logger.info("Payment Meta Data Received:", amount, email, reference)
  try {
    const payload = {
    amount: amount * 100,
    currency: "NGN",
    callback_url: `${process.env.CLIENT_URL}/payment/success`
  }
  
  logger.info("sending to paystack api")
  const repsponse = await axios.post("https://api.paystack.co/transaction/initialize", payload, {
    headers: {
      Authorization: `Bearer ${process.env.PAYSTACK_SECRET as string}`,
      "Content-Type": "application/json"
    }
  })
  
  if(response.data) {
    logger.info("Response Received from paystack:", response.data)
    return response.data
  } 
  
  logger.debug("Something went wrong")
  } catch(error) {
    logger.error("Error Initializing Paystack Transaction:", error)
  }
}

async function verifyTransaction(reference: string){
  try {
    const response = axios.get(`https://api.paystack.co/transaction/verify/{reference}`, {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET}`
      }
    })
    
    if(response.data) {
     logger.info("Response Received from paystack:", response.data)
     return response.data
    } 
  
   logger.debug("Something went wrong")
  } catch(error) {
     logger.error("Error Verifying Transaction:", error)
  }
}

export { initializePayment, verifyTransaction }