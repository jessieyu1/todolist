const tasksRouter = require("express").Router();
const tasks = [];

let id = 1;

tasksRouter.get("/", (req, res) => {
  const { description } = req.query;
  if (description) {
    const filteredTask = tasks.filter((item) =>
      item.description.includes(description)
    );
    return res.json(filteredTask);
  }
  res.json(tasks);
});

tasksRouter.get("/:id", (req, res) => {
  const { id } = req.params;
  const task = tasks.find((task) => task.id === Number(id));
  if (!task) {
    return res.status(404).json({ error: "Task with id not found" });
  }
  res.json(task);
});

tasksRouter.post("/", (req, res) => {
  const { description, done } = req.body;
  if (!description) {
    return res.status(400).json({
      error: "You must provide a description",
    });
  }
  const task = {
    id: id++,
    description,
    done: done || false,
  };
  tasks.push(task);
  res.status(201).json(task);
});

tasksRouter.delete("/:id", (req, res) => {
  const { id } = req.params;
  const index = tasks.findIndex((i) => i.id === Number(id));
  if (index === -1) {
    return res.status(404).json({ error: "Task with id not found" });
  }
  tasks.splice(index, 1);
  res.sendStatus(204);
});

tasksRouter.put("/:id", (req, res) => {
  const { description, done } = req.body;
  const { id } = req.params;
  const task = tasks.find((task) => task.id === Number(id));
  if (!task) {
    return res.status(404).json({ error: "Task with id not found" });
  }
  if (description) {
    task.description = description;
  }
  if (done !== undefined) {
    task.done = done;
  }
  res.json(task);
});

module.exports = tasksRouter;
