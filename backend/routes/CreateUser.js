let express = require("express");
let router = express.Router();
let user = require("../models/User");

let { body, validationResult } = require("express-validator");

let bcrypt = require("bcryptjs");

router.post(
  "/createuser",
  [
    body("email", "Invalid mail id!").isEmail(),
    body("name").isLength({ min: 5 }),
    body("password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //bcrypt---->
    let salt = await bcrypt.genSalt(10);
    let setPassword = await bcrypt.hash(req.body.password, salt);

    try {
      let data = await user({ ...req.body, password: setPassword }).save();
      res.send({ success: "true" });
    } catch (err) {
      console.log(err);
      res.send({ success: "false" });
    }
  }
);

//add to cart--

router.post("/addtocart", async (req, res) => {
  try {
    let { id, cart } = req.body;
    if (id) {
      let myuser = await user.findOneAndUpdate(
        { _id: id },
        { $push: { cart: cart } },
        { new: true }
      );
      res.json({ success: true, myuser });
    } else {
      res.json({ success: false, msg: "you should login frist!" });
    }
  } catch (err) {
    res.json({ success: false, msg: err.message });
  }
});

//remove from cart--
router.post("/removefromcart", async (req, res) => {
  try {
    let { id, cart } = req.body;
    if (id) {
      let myuser = await user.findOneAndUpdate(
        { _id: id },
        { $pull: { cart: cart } },
        { new: true }
      );
      res.json({ success: true, myuser });
    } else {
      res.json({ success: false, msg: "you should login first!" });
    }
  } catch (err) {
    res.json({ success: false, msg: err.message });
  }
});

//add orders--
router.post("/addorders", async (req, res) => {
  try {
    let { id, cart } = req.body;
    if (id) {
      let myuser = await user.findOneAndUpdate(
        { _id: id },
        { $push: { orders: cart } },
        { new: true }
      );
      res.json({ success: true, myuser });
    } else {
      res.json({ success: false, msg: "you should login frist!" });
    }
  } catch (err) {
    res.json({ success: false, msg: err.message });
  }
});

//fetch order--
router.post("/orders", async (req, res) => {
  try {
    let { id } = req.body;
    let User = await user.findOne({ _id: id });
    if (User) {
      res.json(User.orders);
    } else {
      res.json({ success: false, msg: "invalid user" });
    }
  } catch (err) {
    res.json({ success: false, msg: err.message });
  }
});

//set orders--
router.post("/placeorder", async (req, res) => {
  try {
    let { id, cart } = req.body;
    if (id) {
      let myuser = await user.findOneAndUpdate(
        { _id: id },
        { $push: { orders: cart } },
        { new: true }
      );
      res.json({ success: true, myuser });
    } else {
      res.json({ success: false, msg: "you should login frist!" });
    }
  } catch (err) {
    res.json({ success: false, msg: err.message });
  }
});

module.exports = router;
