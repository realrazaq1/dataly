const express = require("express");
const defaultRoutes = require("./routes/defaultRoutes");
const mongoose = require("mongoose");
require("dotenv").config();

// setup express app
const app = express();
const PORT = process.env.PORT || 98;

// view engine'
app.set("view engine", "ejs");

// middleware & static folder
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// connect to MongoDB
(async () => {
  await mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });

  console.log("connectd to MongoDB...");

  // listen for request
  app.listen(PORT, () => {
    console.log(`server running on PORT ${PORT}`);
  });
})();

// routes
app.use(defaultRoutes);
