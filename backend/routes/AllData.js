let express = require("express");
let router = express.Router();
let dataModel = require("../models/Data");
let catagoryModel = require("../models/CatData");
let userModel = require("../models/User.js");

let jwt = require("jsonwebtoken");

router.get("/all", async (req, res) => {
  let token;
  let foodData; // Declare here
  let foodCategory; // Declare here

  try {
    foodData = await dataModel.find();
    foodCategory = await catagoryModel.find();

    if (req.headers.authorization) {
      //gettin then token form header--
      token = req.headers.authorization.split(" ")[1];

      //verify the token--
      let authdata = jwt.verify(
        token,
        "hellomynameiskabiriwanttobeawebdevloper"
      );
      //fetching the user details--
      let userData = await userModel.find({ _id: authdata.user.id });

      //sending response--

      res.send({
        data: foodData,
        category: foodCategory,
        validToken: true,
        id: authdata.user.id,
        user: userData,
      });
    } else {
      res.send({ data: foodData, category: foodCategory, validToken: false });
    }
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError) {
      res.send({ data: foodData, category: foodCategory, validToken: false });
    } else {
      res.send({ data: [], category: [], success: false });
    }
  }
});

module.exports = router;
