import { Request, Response, NextFunction } from 'express'

const timeout = (ms: number) => (req: Request, res: Response, next: NextFunction) => {
  const timeoutId = setTimeout(() => {
    res.status(503).json({ error: "Request timed out" })
    req.destroy() 
  }, ms)

  res.on("finish", () => clearTimeout(timeoutId))
  next()
}

export default timeout(10000) 