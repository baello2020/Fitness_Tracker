// Orlando Baello - Homework 17
// required packages.
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

// Required model
require("./models");

// port & app.
const PORT = process.env.PORT || 8080;

const app = express();

// middlewares
app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Mongoose connection
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/workouts",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  }
);

// required HTML & API routes.
require("./routes/htmlroutes")(app);
require("./routes/apiroutes.js")(app);

// server listener
app.listen(PORT, () => {
  console.log(`App running on port http://localhost:${PORT}`);
});