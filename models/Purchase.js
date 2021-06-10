const mongoose = require("mongoose");

const PurchaseSchema = mongoose.Schema(
  {
    network: {
      type: String,
      required: true,
      trim: true,
    },
    amount: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: String,
      required: true,
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      trim: true,
    },
    reference: {
      type: String,
      required: true,
      trim: true,
    },
    paidAt: {
      type: String,
      required: true,
      trim: true,
    },
    paymentInfo: {
      type: String,
      required: true,
      trim: true,
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("Purchase", PurchaseSchema);
