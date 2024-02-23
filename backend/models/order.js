const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  userNumber: {
    type: String,
    required: true,
  },
  orderItems: [
    {
      quantity: {
        type: Number,
        required: true,
      },
      productId: {
        type: String,
        required: true
      },
      options: {
        type: [String],
        default: [],
        required: false
      },
    },
  ],
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
