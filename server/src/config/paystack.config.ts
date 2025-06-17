import Paystack from "paystack"
import dotenv from "dotenv"
dotenv.config()

const paystack = Paystack(process.env.PAYSTACK_SECRET_KEY as string)

export default paystack