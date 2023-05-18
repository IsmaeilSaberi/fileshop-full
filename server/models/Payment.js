const mongoose = require("mongoose");
const PaymentSchema = new mongoose.Schema({
  username: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
  },
  resnumber: {
    required: true,
    type: String,
  },
  amount: {
    required: true,
    type: Number,
  },
  payed: {
    required: true,
    type: Boolean,
    default: false,
  },
  products: {
    required: true,
    type: Array,
    default: [],
  },
  viewed: {
    required: true,
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: String,
    default: new Date().toLocaleDateString("fa-IR", {
      hour: "2-digit",
      minute: "2-digit",
    }),
  },
  updatedAt: {
    type: String,
    default: new Date().toLocaleDateString("fa-IR", {
      hour: "2-digit",
      minute: "2-digit",
    }),
  },
});

module.exports = mongoose.model("Payment", PaymentSchema);
