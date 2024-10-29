let mongoose = require("mongoose");
// let url =
//   "mongodb+srv://ekabir743368:ekabir743368@cluster0.p4tysvd.mongodb.net/foodweb?retryWrites=true&w=majority";
let url = "mongodb://127.0.0.1:27017/foodweb";

let configure = async () => {
  try {
    await mongoose.connect(url);
  } catch (err) {
    console.log(err);
  }
};

module.exports = configure;
