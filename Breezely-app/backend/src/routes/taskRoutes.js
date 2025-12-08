const express = require("express");
const router = express.Router();
const { createTask } = require("../controllers/task.controller");
const upload = require("../middleware/upload"); // your multer config

router.post("/create", upload.single("pdf"), createTask);

module.exports = router;
