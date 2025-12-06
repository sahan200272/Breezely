const express = require("express");
const router = express.Router();

//import as a module
const { registerUser, updateUser } = require("../controllers/user.controller");

router.post("/register", registerUser);
router.put("/:id", updateUser);

module.exports = router;
