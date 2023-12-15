const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const routes = require("./src/Routes/index.js");
const cors = require("cors");
dotenv.config();
app.use(cors({ credentials: true, origin: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.send("Hello Typescript with Node.js!");
});
mongoose
  .connect(process.env.MONGO_URL)
  .then((db) => {
    console.log("Database is connected");
  })
  .catch((err) => {
    console.log(err);
  });

routes(app);

const server = app.listen(process.env.PORT || 3000, () =>
  console.log(`Example app listening on port ${process.env.PORT || 3000}!`)
);
