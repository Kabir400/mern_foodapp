let express = require("express");
let app = express();
let configure = require("./Configure");
configure();
// let mongo = require("./db");
// mongo();

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,Authorization" // Add 'Authorization' here
  );
  next();
});

app.use("/api", require("./routes/CreateUser"));
app.use("/api", require("./routes/LoginUser"));
app.use("/data", require("./routes/AllData"));

app.listen(4000, () => {
  console.log("app running on 4000 port");
});
