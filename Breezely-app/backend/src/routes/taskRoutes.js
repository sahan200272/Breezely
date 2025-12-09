const express = require("express");
const router = express.Router();
const { createTask, updateTask } = require("../controllers/task.controller");
const upload = require("../middleware/upload"); // your multer config
const { route } = require("./userRoutes");

router.post("/create", upload.array("pdfs"), createTask);
router.put("/update/:id", upload.array("pdfs"), updateTask);

module.exports = router;
