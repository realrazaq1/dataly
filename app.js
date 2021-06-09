const express = require("express");
const defaultRoutes = require("./routes/defaultRoutes");
const app = express();
const PORT = process.env.PORT || 98;

// view engine'
app.set("view engine", "ejs");

// middleware & static folder
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use(defaultRoutes);

app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
