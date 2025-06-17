import { NextFunction } from "express"
import mongoose, { Document, Model } from "mongoose"
import * as argon2 from "argon2"

export interface IUser extends Document {
  username: string
  full_name: string
  avatar?: string
  wallet_balance: number
  kyc_verified: boolean
  is_verified: boolean
  email: string
  password: string
  phone: string
  transactions: mongoose.Types.ObjectId[]
  created_at: Date
  last_login: Date
  pin: string
  total_spent?: number 
  comparePin(candidatePin: string): Promise<boolean>
  comparePassword(candidatePassword: string): Promise<boolean>
  verifyForDeletion(candidatePassword: string): Promise<boolean>
}
interface IUserModel extends Model<IUser> {
  verifyForDeletion(email: string): Promise<IUser | null>;
}

const userSchema = new mongoose.Schema<IUser, IUserModel>({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  full_name: {
    type: String,
    required: true,
    trim: true,
  },
  avatar: {
    type: String,
    default: null,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  wallet_balance: {
    type: Number,
    default: 0,
  },
  pin: {
    type: String,
    select: false,
  },
  phone: {
    type: String,
    unique: true,
    sparse: true,
  },
  kyc_verified: {
    type: Boolean,
    default: false,
  },
  is_verified: {
    type: Boolean,
    default: false,
  },
  created_at: {
    type: Date, 
    default: Date.now,
    },
   last_login: { 
     type: Date, 
     default: null,
    },
  transactions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Transaction",
  }],
},{
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})

userSchema.pre("save", async function(next){
  if(this.isModified("password")){
    try{
      this.password = await argon2.hash(this.password)
    } catch(error){
      return next(error as Error)
    }
  }
  
  if(this.isModified("pin") && this.pin){
    try{
      this.pin = await argon2.hash(this.pin)
    } catch(error){
      return next(error as Error)
    }
  }
  next()
})

userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  try{
    if(!this.password) return false
    return await argon2.verify(this.password, candidatePassword)
  } catch(error){
    throw error
  }
}

userSchema.methods.comparePin = async function(candidatePin: string) {
  if (!this.pin) return false
  return await argon2.verify(this.pin, candidatePin)
}


userSchema.statics.verifyForDeletion = async function(email: string) {
  const user = await this.findOne({ email });
  if (!user) return null;
  return user;
};

userSchema.virtual("total_spent").get(function () {
 if (!this.transactions) return 0
  return this.transactions.filter((t: any) => t.status === "success" && t.type !== "deposit").reduce((sum: number, t: any) => sum + t.amount, 0)
})
userSchema.index({ username: "text" })
const User: IUserModel = mongoose.model<IUser, IUserModel>("User", userSchema)
export default User



