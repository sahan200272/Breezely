const express = require("express");
const router = express.Router();
const {createTask} = require("../controllers/task.controller");
const upload = require("../middleware/upload");


router.post("/create", upload.array("pdfs"), createTask);

module.exports = router;