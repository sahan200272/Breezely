const express = require("express");
const router = express.Router();

//import as a module
const { registerUser } = require("../controllers/user.controller");

router.post("/register", registerUser);

module.exports = router;
