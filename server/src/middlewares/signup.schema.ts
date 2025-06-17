import { Request, Response, NextFunction } from "express"
import joi from "joi"

const NIGERIA_PHONE_REGEX = /^(0|\+234)[7-9][0-1]\d{8}$/

const signUpValidationSchema = joi.object({
  full_name: joi.string().min(3).max(50).required().messages({
    "string.empty": "Full name is required",
    "string.min": "Full name must be at least 3 characters",
    "string.max": "Full name cannot exceed 50 characters"
  }),
  username: joi.string().min(4).max(15).alphanum().required().messages({
    "string.empty": "Username is required",
    "string.min": "Username must be at least 4 characters",
    "string.max": "Username cannot exceed 15 characters",
    "string.alphanum": "Username can only contain letters and numbers"
  }),
  email: joi.string().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Email must be valid"
  }),
  phone: joi.string().pattern(NIGERIA_PHONE_REGEX).required().messages({
    "string.empty": "Phone number is required",
    "string.pattern.base": "Phone must be a valid Nigerian number (e.g., 08012345678)"
  }),
  password: joi.string().min(8).max(30).pattern(/[a-z]/, { name: "lowercase" }).pattern(/[A-Z]/, { name: "uppercase" }).pattern(/[0-9]/, { name: "number" }).pattern(/[^a-zA-Z0-9]/, { name: "special character" }).required().messages({
      "string.empty": "Password is required",
      "string.min": "Password must be at least 8 characters",
      "string.max": "Password cannot exceed 30 characters",
      "string.pattern.name": "Password must contain at least one {#name}"
    })
})

export const validateSignUpInput = (req: Request, res: Response, next: NextFunction) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    res.status(400).json({
      message: "Validation Error",
      error: [{ field: "body", message: "Request body is required" }]
    })
    return 
  }

  const { error } = signUpValidationSchema.validate(req.body, {
    abortEarly: false,
    allowUnknown: false,
    stripUnknown: true
  })

  if (error) {
    res.status(400).json({
      message: "Sign Up Validation Error",
      error: error.details.map((detail) => ({
        field: detail.path.join("."),
        message: detail.message.replace(/"/g, "")
      }))
    })
    return 
  }

  next()
}