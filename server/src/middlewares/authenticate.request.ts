import { Request, Response, NextFunction } from "express"
import User, { IUser } from "@/models/user"
import jwt from "jsonwebtoken"

export interface AuthenticatedRequest extends Request {
  user?: IUser
}

export const authenticateUser = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const accessToken = req.cookies.accessToken || req.headers.authorization?.split(" ")[1]

  if (!accessToken || typeof accessToken !== "string") {
     res.status(401).json({ message: "Unauthorized. No token provided." })
     return 
  }

  try {
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET!)
    req.user = decoded 
    next()
  } catch (error) {
    console.error(error)
    res.status(401).json({ message: "Invalid token" })
  }
}