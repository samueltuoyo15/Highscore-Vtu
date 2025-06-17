import mongoose from "mongoose"
import logger from "@/utils/logger"
import retry from "async-retry"

const MONGO_URI = process.env.MONGO_URI
if (!MONGO_URI) throw new Error("MONGO_URI missing in env")

export const connectToDb = async () => {
  try {
    await retry(
      async () => {
        await mongoose.connect(MONGO_URI)
        logger.info("Connected to MongoDB")
      },
      {
        retries: 3,
        minTimeout: 1000,
        onRetry: (error) => logger.warn("Retrying DB connection...", error),
      }
    )
  } catch (error) {
    logger.error("Failed to connect to MongoDB after retries", error)
    process.exit(1)
  }
}

export const disconnectFromDb = async () => {
  if (mongoose.connection.readyState !== 0) { // 0 = disconnected
    await mongoose.disconnect()
    logger.info("Disconnected from MongoDB")
  }
}
