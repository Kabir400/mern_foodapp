let mongoose = require("mongoose");

let userSchema = new mongoose.Schema({});

module.exports = mongoose.model("food_category", userSchema, "food_category");
