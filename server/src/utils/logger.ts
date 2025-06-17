import pino from "pino"
import fs from "fs"
import path from "path"

if (process.env.NODE_ENV === "production") {
  const logDir = './logs'
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }
}

const logger = pino({
  level: process.env.LOG_LEVEL || "info",
  transport: process.env.NODE_ENV === "production" 
    ? { 
        target: 'pino/file',
        options: { 
          destination: './logs/app.log',
          mkdir: true 
        }
      }
    : {
        target: 'pino-pretty',
        options: { 
          colorize: true,
          translateTime: 'SYS:yyyy-mm-dd HH:MM:ss',
          ignore: 'pid,hostname',
        }
      }
})

export default logger