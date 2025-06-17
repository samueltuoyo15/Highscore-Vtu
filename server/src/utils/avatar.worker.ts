import { Queue, Worker } from "bullmq"
import User from "@/models/user"
import { Types } from "mongoose"
import logger from "@/utils/logger"
import { redis } from "@/config/connect.redis"
import cloudinary from "@/config/connect.cloudinary"

export const queue = new Queue("upload-avatar", {
  connection: redis,
  limiter: { max: 5, duration: 1000 }
})

async function uploadToCloudinary(imagePath: string, userId: Types.ObjectId) {
  try {
    const result = await cloudinary.uploader.upload(imagePath, {
      folder: "users_avatar",
      public_id: `sams_vtu_${userId}`
    })
    logger.info("Image Uploaded Successfully")
    await User.findByIdAndUpdate(userId, { avatar: result.secure_url})
  } catch(error) {
    logger.error("Error Uploading To Cloudinary", error)
  }
}

const worker = new Worker("upload-avatar", async(job: { data: { imagePath: string, userId: Types.ObjectId }}) => {
  const { imagePath, userId } = job.data
  await uploadToCloudinary(imagePath, userId)
 }, { connection: redis, concurrency: 3, attempts: 3,  backoff: { type: "exponential", delay: 1000 }, 
})

worker.on("failed", (job, error) => {
  logger.error(`Image upload job failed for job: ${job}`, error)
})
