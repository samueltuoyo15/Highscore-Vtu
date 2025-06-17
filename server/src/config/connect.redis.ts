import Redis from "ioredis"
import logger from "@/utils/logger"

const REDIS_URL = process.env.REDIS_URL
if(!REDIS_URL) {
  throw new Error("Redis Connection Url is missing")
}

export const redis = new Redis(REDIS_URL, {
  retryStrategy: (times) => {
    const delay = Math.min(times * 50, 5000)
    logger.warn(`Retrying Redis connection in ${delay}ms`)
    return delay
  },
  maxRetriesPerRequest: 3, 
})
redis.on("connect", () => logger.info("Connected to Redis"))
redis.on("error", (err) => logger.error("Redis Error:", err))
redis.on("close", () => logger.warn("Redis Connection Closed"))


export const disconnectRedis = async () => {
  await redis.quit()
  logger.info("Redis Disconnected Gracefully")
}

