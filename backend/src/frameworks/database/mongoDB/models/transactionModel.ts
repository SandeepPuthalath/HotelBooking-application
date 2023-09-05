import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema(
  {
    wallet: {
      type: mongoose.Types.ObjectId,
      require: true,
      ref: "wallet",
    },
    amount: {
      type: Number,
      require: true,
    },
  },
  { timestamps: true }
);

const Transaction = mongoose.model("transaction", TransactionSchema);

export default Transaction;
