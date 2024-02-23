const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    colors: [
      {
        url: {
          type: String,
          required: true,
        },
        color: {
          type: String,
          required: true,
        },
      }
    ],
    storages: [
      {
        size: String,
      }
    ],
    unique_code: {
      type: Number,
      required: false,
    }
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
