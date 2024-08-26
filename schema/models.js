const mongoose = require("mongoose");

const configProductSchema = {
  name: {
    type: String,
    required: true,
  },
  description: String,
  price: Number,
  category: String,
  image: String,
};
const configUserSchema = {
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: false,
    default: "guest",
  },
};
var productSchema = mongoose.Schema(configProductSchema, {
  timestamps: true,
  versionKey: false,
});
var userSchema = mongoose.Schema(configUserSchema, {
  timestamps: true,
  versionKey: false,
});
const Product = new mongoose.model("Products", productSchema);
const User = new mongoose.model("Users", userSchema);
const models = {
  Product,
  User,
};
module.exports = models;
