import { redis } from "@/config/connect.redis"
import logger from "@/utils/logger"

const OTP_EXPIRY = 10 * 60

export const generateAndStoreOTP = async (email: string): Promise<string> => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString()
  
  await redis.set(`otp:${email}`, otp, "EX", OTP_EXPIRY)
  logger.debug(`OTP generated for ${email}`)
  return otp
}

export const verifyOTP = async (email: string, otp: string): Promise<boolean> => {
  const storedOTP = await redis.get(`otp:${email}`)
  
  if (!storedOTP || storedOTP !== otp) {
    logger.warn(`Invalid OTP attempt for ${email}`)
    return false
  }
  
  await redis.del(`otp:${email}`)
  return true
}

export const deleteOTP = async (email: string): Promise<void> => {
  await redis.del(`otp:${email}`)
}