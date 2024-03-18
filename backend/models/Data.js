//this is the data of food items--

let mongoose = require("mongoose");

let userSchema = new mongoose.Schema({});

module.exports = mongoose.model("food_items", userSchema, "food_items");
