const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

const tasks = [];

let id = 1;

app.get("/tasks", (req, res) => {
  const { description } = req.query;
  if (description) {
    const filteredTask = tasks.filter((item) =>
      item.description.includes(description)
    );
    return res.json(filteredTask);
  }
  res.json(tasks);
});

app.get("/tasks/:id", (req, res) => {
  const { id } = req.params;
  const task = tasks.find((task) => task.id === Number(id));
  if (!task) {
    return res.status(404).json({ error: "Task with id not found" });
  }
  res.json(task);
});

app.post("/tasks", (req, res) => {
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

app.delete("/tasks/:id", (req, res) => {
  const { id } = req.params;
  const index = tasks.findIndex((i) => i.id === Number(id));
  if (index === -1) {
    return res.status(404).json({ error: "Task with id not found" });
  }
  tasks.splice(index, 1);
  res.sendStatus(204);
});

app.put("/tasks/:id", (req, res) => {
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

const PORT = 3000;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
