const express = require("express");
const DefaultController = require("../controllers/DefaultController");

const router = express.Router();

// homepage
router.get("/", DefaultController.showHomePage);
router.get("/verify_transaction", DefaultController.verifyTransaction);

module.exports = router;
