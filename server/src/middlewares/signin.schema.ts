import { Request, Response, NextFunction } from "express"
import joi from "joi"

const NIGERIA_PHONE_REGEX = /^(0|\+234)[7-9][0-1]\d{8}$/

const signInValidationSchema = joi.object({
  email: joi.string().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Email must be valid"
  }),
  password: joi.string().min(8).max(30).pattern(/[a-z]/, { name: "lowercase" }).pattern(/[A-Z]/, { name: "uppercase" }).pattern(/[0-9]/, { name: "number" }).pattern(/[^a-zA-Z0-9]/, { name: "special character" }).required().messages({
      "string.empty": "Password is required",
      "string.min": "Password must be at least 8 characters",
      "string.max": "Password cannot exceed 30 characters",
      "string.pattern.name": "Password must contain at least one {#name}"
    })
})

export const validateSignInInput = (req: Request, res: Response, next: NextFunction) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    res.status(400).json({
      message: "Validation Error",
      error: [{ field: "body", message: "Request body is required" }]
    })
    return 
  }

  const { error } = signInValidationSchema.validate(req.body, {
    abortEarly: false,
    allowUnknown: false,
    stripUnknown: true
  })

  if (error) {
    res.status(400).json({
      message: "Sign In Validation Error",
      error: error.details.map((detail) => ({
        field: detail.path.join("."),
        message: detail.message.replace(/"/g, "")
      }))
    })
    return 
  }

  next()
}