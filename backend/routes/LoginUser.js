let express = require("express");
let router = express.Router();
let user = require("../models/User");

let { body, validationResult } = require("express-validator");

let bcrypt = require("bcryptjs");
let jwt = require("jsonwebtoken");
let jwtSec = "hellomynameiskabiriwanttobeawebdevloper";

router.post(
  "/login",
  [
    body("email", "Invalid mail id!").isEmail(),
    body("password", "password must be more than 4 caracter").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let email = req.body.email;
    try {
      let data = await user.findOne({ email });
      if (!data) {
        return res.status(400).json({ errors: "You are not a member!" });
      }
      //bcrypt---->

      let pasCompare = await bcrypt.compare(req.body.password, data.password);
      if (!pasCompare) {
        return res.status(400).json({ errors: "Wrong password!" });
      }
      //jwt---->
      let authdata = {
        user: {
          id: data.id,
        },
      };
      let authToken = jwt.sign(authdata, jwtSec);

      res.send({ success: "true", authToken: authToken, data });
    } catch (err) {
      console.log(err);
      res.send({ success: "false" });
    }
  }
);

module.exports = router;
