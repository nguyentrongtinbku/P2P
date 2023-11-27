const express = require("express");
const mongoose = require("mongoose");
const os = require("os");
const bodyParser = require("body-parser");
const app = express();
const port = 8080;
const cors = require("cors");
const User = require("./model/User");
const ping = require("ping");
const userRoute = require("./routes/routeUser");

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

async function connect() {
  try {
    await mongoose.connect("mongodb://localhost:27017/MMT", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("connected in mongdb");
  } catch (error) {
    console.log("ko ket noi duoc");
  }
}
connect();

app.use(bodyParser.json());
app.use(bodyParser.text());


app.use("/", userRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

