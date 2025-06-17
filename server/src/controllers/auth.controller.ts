import { Request, Response } from "express"
import { AuthenticatedRequest } from "@/middlewares/authenticate.request"
import User, { IUser } from "@/models/user"
import { generateAccessToken, generateRefreshToken } from "@/utils/generate.token"
import { sendOTP, verifyStoredOTP } from "@/utils/otp" 
import logger from "@/utils/logger"
import RefreshToken from "@/models/refresh.token"
import PasswordToken from "@/models/password.token"
import Transaction from "@/models/transaction" 
import { addHours, isAfter } from "date-fns"
import crypto from "crypto"

async function signUpUser(req: Request, res: Response): Promise<any> {
  try {
    logger.info("SignUpUser Endpoint Hit")
    const { username, full_name, email, password, phone } = req.body
    if (!username || !full_name || !email || !password || !phone) {
       return res.status(422).json({ status: "error", message: "All fields are required" })
    }

   const existingUser = await User.findOne({ email })
    if (existingUser) {
     return res.status(409).json({ status: "error", message: "Email already in use"  })
    }
    const existingUsername = await User.findOne({ username })
    if (existingUsername) {
      return res.status(409).json({ status: "error", message: "Username already taken", })
    }
    const user = await User.create({
      full_name,
      username,
      password, 
      phone,
      email,
      is_verified: false
    })
    try {
     const otp = await sendOTP(email) 
     return res.status(201).json({ status: "success", message: "OTP sent to email"  })
   } catch (otpError) {
     await User.deleteOne({ _id: user._id })
     throw otpError
    }
  } catch (error) {
    logger.error("Signup error:", error)
    return res.status(500).json({ status: "error", message: "Internal server error" })
  }
}

async function verifyOTP(req: Request, res: Response): Promise<any> {
  try {
    logger.info("VerifyOtp Endpoint Hit")
    const { email, otp } = req.body

    if (!email || !otp) {
       return res.status(400).json({ status: "error", message: "email and OTP are required",})
    }

    const isValid = await verifyStoredOTP(email, otp)
    if (!isValid) {
      return res.status(400).json({status: "error",message: "Invalid/expired OTP", })
    }

 
    const user = await User.findOneAndUpdate(
     { email } , { is_verified: true }, { new: true })

    if (!user) {
      return res.status(404).json({ status: "error", message: "User not found",})
    }
  
    const accessToken = generateAccessToken(user._id, user.email)
    const refreshToken = generateRefreshToken(user._id, user.email)

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, 
    })

     return res.status(200).json({
      status: "success",
      message: "Account Verified Successfully",
      accessToken
    })
  } catch (error) {
    logger.error("OTP verification error:", error)
    return res.status(500).json({ status: "error",message: "Internal server error"})
  }
}

async function loginUser(req: Request, res: Response): Promise<any> {
  try {
    logger.info("Login Endpoint Hit")
    const { email, password } = req.body
    if(!email || !password){
     return res.status(400).json({ status: "error", message: "All fields are required" })
    }
    const user = await User.findOne({ email }).exec()
    if(!user){
     return res.status(404).json({ status: "error", message: "User Does not Exists", })
    }
    
    const isPasswordValid = await user.comparePassword(password)
    if(!isPasswordValid){
     return res.status(401).json({ status: "error", message: "Incorrect Password"})
    }
    
    if(!user.is_verified){
     return res.status(403).json({ status: "error", message: "Account Not Verified. Please kindly check your mail and verify"})
    }
    
    const accessToken = generateAccessToken(user._id, user.email)
    const refreshToken = generateRefreshToken(user._id, user.email)
    
    await RefreshToken.create({
      token: refreshToken,
      user: user._id,
      expiresAt: addHours(new Date(), 168),
    })
    
     res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000, 
    })
     res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, 
    })

    user.last_login = new Date()
    await user.save()
    
   return res.status(200).json({
      status: "success",
      message: "User Signed In Successfully",
      accessToken
    })
  } catch(error){
    logger.error("Login User error:", error)
    return res.status(500).json({ status: "error", message: "Internal server error" })
  }
}
 
async function logoutUser(req: Request, res: Response): Promise<any>{
  logger.info("Logout Endpoint Hit")
  try{
    const refreshToken = req.cookies.refreshToken
    res.clearCookie("refreshToken", {
     httpOnly: true,
     secure: process.env.NODE_ENV === "production",
     sameSite: "strict",
    })
    
    if(refreshToken){
      await RefreshToken.findOneAndDelete({ token: refreshToken })
    }
   return res.status(200).json({ status: "success", message: "Logout Successful"})
  } catch(error){
    logger.error("Logout error:", error)
    return res.status(500).json({ status: "error", message: "Internal server error", })
  }
}

async function refreshAccessToken(req: Request, res: Response): Promise<any> {
  logger.info("Refresh Endpoint Hit")
 try {
    const refreshToken = req.cookies.refreshToken
    if(!refreshToken){
     return res.status(400).json({ status: "error", message: "Refresh Token is required"})
    }
    const storedToken = await RefreshToken.findOne({ token: refreshToken }).populate<{ user: IUser }>("user")
    if(!storedToken){
      res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
     })
     return res.status(401).json({ status: "error", message: "Invalid Refresh Token"})
  }
  
  if(new Date() > storedToken.expiresAt) {
    await RefreshToken.findByIdAndDelete(storedToken._id)
     res.clearCookie("refreshToken", {
      httpOnly: true,
       secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
     })
     return res.status(401).json({ status: "error", message: "Expired Refresh Token"})
  }
  
  const user = storedToken.user
  const accessToken = generateAccessToken(user._id, user.email)
   res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000, 
   })
  return res.status(201).json({ status: "success", data: { accessToken }})
 } catch(error){
   logger.error("Refresh Access Token error:", error)
   return res.status(500).json({ status: "error", message: "Internal server error", })
  }
}

async function forgotPassword(req: Request, res: Response): Promise<any> {
  logger.info("Forget password Endpoint Hit")
  try {
    const { email } = req.body
    if(!email) {
      return res.status(400).json({ status: "error", message: "Email is required"})
    }
    
    const user = await User.findOne({ email })
    if(!user) {
      return res.status(200).json({ status: "success", message: "if the email exists a reset link has been sent" })
    }
    
    const resetToken = crypto.randomBytes(32).toString("hex")
    const expiresAt = addHours(new Date(), 1)
    
    PasswordToken.create({
      token: resetToken,
      user: user._id,
      expiresAt
    })
    
    const resetLink = `${process.env.CLIENT_URL}/reset-token?token=${resetToken}`
    logger.info(`Password reset link for ${email}: ${resetToken}`)
    // Todo send rest link to their email
    
    return res.status(200).json({ status: "success", message: "password rest link sent to email"})
  } catch(error){
   logger.error("Forgot Password:", error)
   return res.status(500).json({ status: "error", message: "Internal server error", })
  }
}
 
async function resetPassword(req: Request, res: Response): Promise<any> {
  logger.info("Forget password Endpoint Hit")
  try{
    const { token, new_password } = req.body
    if(!token || !new_password) {
      return res.status(400).json({ status: "error", message: "All fields are required"})
    }
    
    const passwordToken = await PasswordToken.findOne({ token }).populate<{user: IUser}>("user")
    if(!passwordToken) {
      return res.status(400).json({ status: "error", message: "Invalid Reset Token "})
    }
    
    if(isAfter(new Date(), passwordToken.expiresAt)) {
      await PasswordToken.deleteOne({ token })
      return res.status(400).json({ status: "error", message: "Expired Reset Token"})
    }
    
    const user = passwordToken.user
    user.password = new_password
    await user.save()
    await RefreshToken.deleteMany({ user: user._id })
    await PasswordToken.deleteOne({ token })
    logger.info(`Password Reset was successful for ${user._id}`)
    res.status(201).json({ status: "success", message: "Password reset was successful!"})
  } catch(error){
   logger.error("Reset Password Failed:", error)
   return res.status(500).json({ status: "error", message: "Internal server error", })
  }
 }
 
 async function changePassword(req: AuthenticatedRequest, res: Response): Promise<any> {
  logger.info("Change password Endpoint Hit")
  try{
    const { current_password, new_password } = req.body
    const userId = req.user?._id 
   
    if(!current_password || !new_password) {
      return res.status(400).json({ status: "error", message: "Current Password and New Password is required "})
    }
    
    const user = await User.findById(userId)
    if(!user){
     return res.status(401).json({ status: "error", message: "User not found", })
    }
    
    const isPasswordValid = await user.comparePassword(current_password)
    if(!isPasswordValid){
     return res.status(401).json({ status: "error", message: "Current Password is incorrect"})
    }
    
    user.password = new_password
    await user.save()
    await RefreshToken.deleteMany({ user: userId })
   logger.info(`Password was changed successful for ${user._id}`)
    res.status(201).json({ status: "success", message: "Password Changedwas successful!"})
  } catch(error){
   logger.error("Change Password Failed:", error)
   return res.status(500).json({ status: "error", message: "Internal server error", })
  }
 }
 
async function deleteAccount(req: Request, res: Response): Promise<any> {
  logger.info("Delete account Endpoint Hit!")
  try {
    const { email, password } = req.body
    if(!email || !password) {
      return res.status(400).json({ status: "error", message: "Email and Password are required"})
    }
    
    const user = await User.findOne(email)
    if(!user) {
      return res.status(400).json({ status: "success", message: "Account Deletion Processed "})
    }
    
    const passwordValid = await user.comparePassword(password)
    if(!passwordValid) {
      return res.status(401).json({ status: "success", message: "Invalid Credentials "})
    }
    
    await Promise.all([
      User.deleteOne({ _id: user._id }),
      Transaction.deleteMany({ user: user._id }),
      RefreshToken.deleteMany({user: user._id }),
      PasswordToken.deleteMany({user: user._id })
      ])
    res.clearCookie("accessToken")
    res.clearCookie("refreshToken")
    
    logger.info(`Account Deleted for user: ${user._id}`)
     return res.status(200).json({ 
      status: "success",
      message: "Account and all related data deleted",
      deletedAt: new Date() 
    })
  } catch(error){
   logger.error("Failed to delete account:", error)
   return res.status(500).json({ status: "error", message: "Internal server error", })
  }
}
 
export { signUpUser, verifyOTP, loginUser, logoutUser, refreshAccessToken, forgotPassword, resetPassword, changePassword, deleteAccount } 



