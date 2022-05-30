const mongoose = require("mongoose");
const { required } = require("nodemon/lib/config");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please enter the name"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "please enter the description"],
  },
  price: {
    type: Number,
    required: [true, "please enter product price"],
    maxLength: [8, "price cannot exceed above 8 figure"],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "please enter a category"],
  },
  stock: {
    type: Number,
    required: [true, "please enter product stock"],
    maxLength: [4, "stoke cannot exceed 4 figures"],
    default: 1,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);
