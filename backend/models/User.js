let mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  location: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  number: {
    type: Number,
    require: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  password: {
    type: String,
    require: true,
  },
  cart: [
    {
      img: String,
      name: String,
      qty: String,
      size: String,
      price: Number,
    },
  ],
  orders: [
    [
      {
        img: String,
        name: String,
        qty: String,
        size: String,
        price: Number,
        date: { type: Date, default: Date.now() },
      },
    ],
  ],
});

module.exports = mongoose.model("users", userSchema);
