const express = require("express");
const router = express.Router();
const { createTask, updateTask, getAllTasks, getSingleTask } = require("../controllers/task.controller");
const upload = require("../middleware/upload"); // your multer config

router.post("/create", upload.array("pdfs"), createTask);
router.put("/update/:id", upload.array("pdfs"), updateTask);
router.get("/", getAllTasks);
router.get("/:id", getSingleTask);

module.exports = router;
