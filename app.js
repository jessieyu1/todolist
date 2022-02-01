const express = require("express");
const cors = require("cors");
const app = express();
const tasksRouter = require("./controllers/tasks");

app.use(cors());
app.use(express.json());

app.use("/api/tasks", tasksRouter);

module.exports = app;
