import { Request, Response, NextFunction } from "express"
import logger from "@/utils/logger"

const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  logger.info(`Recieved: ${req.method} request to ${req.url}`)
  logger.info(`Request Body: ${req.body}`)
  next()
}

export default requestLogger