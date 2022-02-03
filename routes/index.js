const express = require("express");
const taskRouter = require("./tasks");
const router = express.Router();

router.use("/tasks", taskRouter);
// router.get('/books', bookRouter);

module.exports = router;
