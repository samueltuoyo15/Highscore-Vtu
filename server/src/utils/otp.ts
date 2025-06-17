import nodemailer from "nodemailer"
import { generateAndStoreOTP, verifyOTP } from "@/services/otp"

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL, 
    pass: process.env.EMAIL_PASSWORD
    }
})

async function sendOTP(email: string) {
  const otp = Math.floor(100000 + Math.random() * 900000)
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000)

  await generateAndStoreOTP(email)

  await transporter.sendMail({
    from: "SamsVtu",
    to: email,
    subject: "Verify Your Email",
    html: `Your OTP is <b>${otp}</b>. Expires in 10 minutes.`
  })

  return otp
}

async function verifyStoredOTP (email: string, otp: string){
  return await verifyOTP(email, otp)
}

export { sendOTP, verifyStoredOTP }