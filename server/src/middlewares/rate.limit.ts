import RedisStore from "rate-limit-redis"
import { rateLimit } from "express-rate-limit"
import { redis } from "@/config/connect.redis"
import { Request, Response } from "express"
import logger from "@/utils/logger"

export const createBasicRateLimiter = (maxRequests: number, time: number) => {
  return rateLimit({
    max: maxRequests,
    windowMs: time,
    message: "Too many Request, Please try again later",
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req: Request, res: Response) => {
    logger.warn(`Sensitive endpoint rate limit exceeded for ${req.ip || req.socket.remoteAddress}`)
    res.status(429).json({ success: false, message: "Too many requests. Try again later"})
  },
  store: new RedisStore({
    // @ts-expect-error - ioredis type workaround 
    sendCommand: (...args: string[]) => redis.call(...args) 
   })
  })
}


