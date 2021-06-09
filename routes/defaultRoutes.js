const express = require("express");
const defaultController = require("../controllers/defaultController");

const router = express.Router();

// homepage
router.get("/", defaultController.showHomePage);
router.get("/verify_transaction", defaultController.verifyTransaction);

module.exports = router;
