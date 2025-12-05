const express = require("express");
const router = express.Router();
const { createUser } = require("../controllers/userControl");

router.post("/register", createUser);

module.exports = router;
