import jwt from "jsonwebtoken"

export const generateAccessToken = (_id, email) => {
  const token = jwt.sign(
    {
      _id,
      email,
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "15m",
    }
  )

  return token
}

export const generateRefreshToken = (_id, email) => {
  const token = jwt.sign(
    {
      _id,
      email,
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "7d",
    }
  )

  return token
}

export const generateMailToken = (_id, email) => {
  const token = jwt.sign(
    {
      _id,
      email,
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "5m",
    }
  )

  return token
}