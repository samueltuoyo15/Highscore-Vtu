import { Router } from "express"
import { validateSignUpInput } from "@/middlewares/signup.schema"
import { validateSignInInput } from "@/middlewares/signin.schema"
import { signUpUser, verifyOTP, loginUser, logoutUser, refreshAccessToken, forgotPassword, resetPassword, changePassword, deleteAccount } from "@/controllers/auth.controller"

const router = Router()

router.post("/signup", validateSignUpInput, signUpUser)
router.get("/verify-otp", verifyOTP)
router.post("/signin", validateSignInInput, loginUser)
router.get("/logout-user", logoutUser)
router.get("/refresh-access-token", refreshAccessToken)
router.post("/forgot-password", forgotPassword)
router.post("/reset-password", resetPassword)
router.post("/change-password", changePassword)
router.post("/delete-account", deleteAccount)

export default router 



