import mongoose from "mongoose"

const refreshTokenSchema = new mongoose.Schema({
   token: {
     type: String,
     unique: true,
     required: true,
   },
   user: {
     type: mongoose.Schema.Types.ObjectId,
     ref: "User",
   },
   expiresAt: {
     type: Date,
     required: true,
   },
}, { timestamps: true })


refreshTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0})

const RefreshToken = mongoose.model("RefreshToken", refreshTokenSchema)

export default RefreshToken