import cors from "cors"
import dotenv from "dotenv"
dotenv.config()

export const corsConfig = () => {
  return cors({
    origin: (origin, callback) => {
      const allowedOrigins = [process.env.CLIENT_URL!]
      if(!origin || allowedOrigins.indexOf(origin) !== -1){
        callback(null, true)
      } else{
        callback(new Error("Sorry your origin is whitelisted from using our api"))
      }
    },
    methods: ["GET", "PUT", "POST", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept-Version"],
    exposedHeaders: ["X-Total-Count", "Content-Range"],
    credentials: true,
    preflightContinue: false,
    maxAge: 600
  })
}

