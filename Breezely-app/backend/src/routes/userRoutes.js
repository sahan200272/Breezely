const express = require("express");
const router = express.Router();

//import as a module
const { registerUser, updateUser, getAllUsers, getUserByID} = require("../controllers/user.controller");

router.post("/register", registerUser);
router.put("/:id", updateUser);
router.get("/get", getAllUsers);
router.get("/:id", getUserByID);

module.exports = router;
