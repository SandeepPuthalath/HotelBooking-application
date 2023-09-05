import mongoose from "mongoose";

const WalletSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      require: true,
      ref: "User",
    },
    balance: {
      type: Number,
      default: 0,
    },
    transactions: [{ type: mongoose.Types.ObjectId, ref: "transaction" }],
  },
  { timestamps: true }
);

const Wallet = mongoose.model("wallet", WalletSchema);

export default Wallet