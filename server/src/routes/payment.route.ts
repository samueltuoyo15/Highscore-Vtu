import { Router } from "express"
import { authenticateUser } from "@/middlewares/authenticate.request"
import { fundWallet, handlePaystackWebHook } from "@/controllers/payment.controller"

const router = Router()

router.post("/fund-wallet", authenticateUser, fundWallet)
router.post("/verify-payment", authenticateUser, handlePaystackWebHook)

export default router 



