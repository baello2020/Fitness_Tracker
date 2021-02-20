// Orlando Baello - Homework 17
// required packages.
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

// Require our model
require("./models");

// Declare our PORT and app.
const PORT = process.env.PORT || 8080;

const app = express();

// Set middlewares for our app.
app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Connect to Mongoose.
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/workout",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  }
);

// REQUIRE our HTML and API routes.
require("./routes/htmlRoutes")(app);
require("./routes/apiRoutes.js")(app);

// Listen to our server.
app.listen(PORT, () => {
  console.log(`App running on port http://localhost:${PORT}`);
});