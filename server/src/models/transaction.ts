import mongoose, { Document, Schema } from "mongoose"

type NetworkType = "MTN" | "Airtel" | "Glo" | "9mobile"

interface ITransactionMetadata {
  phone?: string
  network?: NetworkType
  plan?: string
  biller?: string    
}

interface ITransaction extends Document {
  user: mongoose.Types.ObjectId
  type: "deposit" | "withdrawal" | "airtime" | "data" | "cable_tv" | "electricity" | "internet" | "mobile_money"
  amount: number;
  status: "pending" | "success" | "failed"
  reference: string;
  metadata?: ITransactionMetadata
}

const transactionSchema = new Schema<ITransaction>(
  {
    user: { 
    type: Schema.Types.ObjectId,
    ref: "User", 
    required: true 
    },
    type: { 
      type: String, 
      enum: ["deposit", "withdrawal", "airtime", "data", "cable_tv", "electricity", "internet", "mobile_money"], 
      required: true 
    },
    amount: {
      type: Number,
      required: true 
    },
    status: { 
      type: String, 
      enum: ["pending", "success", "failed"], 
      default: "pending" 
    },
    reference: { 
      type: String, 
      required: true, 
      unique: true 
    },
    metadata: {
      type: {
        phone: String,
        network: { 
          type: String, 
          enum: ["MTN", "Airtel", "Glo", "9mobile"] 
        },
        plan: String,
        biller: String
      },
      default: {}
    }
  },
  { timestamps: true }
)

const Transaction = mongoose.model<ITransaction>("Transaction", transactionSchema)
export default Transaction