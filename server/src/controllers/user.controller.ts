import { Request, Response } from "express"
import { AuthenticatedRequest } from "@/middlewares/authenticate.request"
import User, { IUser } from "@/models/user"
import logger from "@/utils/logger"
import { redis } from "@/config/connect.redis"

const USER_CACHE_TTL = 5 * 60

async function getCurrentUser(req: AuthenticatedRequest, res: Response): Promise<any> {
  logger.info("Me Endpoint Hit")
  try {
    const userId = req?.user?._id
    logger.info(`User Id: ${userId}`)
    
    if(!userId) {
      return res.status(422).json({ status: "error", message: "user Id is required" })
    }
    
    const cachedUser = await redis.get(`currentUser:${userId}`)
    if (cachedUser) {
      logger.debug(`Cache Hit for UserId: ${userId}`)
      return res.status(200).json({ status: "success", data: JSON.parse(cachedUser)})
    }
    
    const user = await User.findById(userId).lean()
  
    if(!user) {
     logger.warn(`User not found: ${userId}`)
     return res.status(404).json({ status: "error", message: "user does not exist"})
    }
    
    await redis.set(`currentUser:${userId}`, JSON.stringify(user), "EX", USER_CACHE_TTL).catch(e => logger.error("Cache Set Failed:", e))
    return res.status(200).json({ status: "success", data: user })
  } catch(error) {
    logger.error(`Error fetching user: ${req?.user?._id}`, error)
    return res.status(500).json({ status: "error", message: "Internal server error" })
  }
}

async function updateUserInfo(req: AuthenticatedRequest, res: Response): Promise<any> {
  logger.info("Update UserInfo Endpoint Hit")
  try{
    const userId = req.user?._id
    const updates = req.body
    if(!userId || !updates) {
      return res.status(422).json({ status: "error", message: "user Id and updated info are required" })
    }
    
   const fieldsToUpdate = {
     username: updates.username,
     full_name: updates.full_name
   }
   
   const updatedUser = await User.findByIdAndUpdate(userId, fieldsToUpdate, { new: true, runValidators: true})
   if(!updatedUser) {
      return res.status(404).json({ status: "error", message: "user not found" })
   }
   
     await redis.set(`currentUser:${userId}`, JSON.stringify(updatedUser), "EX", USER_CACHE_TTL).catch(e => logger.error("Cache Update Failed:", e))
     return res.status(200).json({ status: "success", message: "profile update successfully" })
  } catch(error) {
    logger.error(`Error Updating user Info: ${req?.user?._id}`, error)
    return res.status(500).json({ status: "error", message: "Internal server error" })
  }
}

export {getCurrentUser, updateUserInfo}