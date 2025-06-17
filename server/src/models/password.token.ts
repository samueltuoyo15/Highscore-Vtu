import mongoose, { Schema } from "mongoose"

const passwordTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true
    },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User", required: true
    },
  expiresAt: { 
    type: Date, 
    required: true
    },
}, { timestamps: true })

const PasswordToken = mongoose.model("PasswordToken", passwordTokenSchema)

export default PasswordToken