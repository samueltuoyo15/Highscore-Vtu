import { Router } from "express"
import { authenticateUser } from "@/middlewares/authenticate.request"
import { getCurrentUser } from "@/controllers/user.controller"

const router = Router()

router.get("/get-auth-user", authenticateUser, getCurrentUser)

export default router 



