const express = require("express");
const app = express();

app.use(express.json());

let data = [
  { id: 1, description: "task No.1", done: false },
  {
    id: 2,
    description: "task No.2",
    done: false,
  },
  {
    id: 3,
    description: "task No.3",
    done: false,
  },
  {
    id: 4,
    description: "task No.4",
    done: false,
  },
  {
    id: 5,
    description: "task No.5",
    done: false,
  },
];

const generateId = () => {
    const maxId = data.length > 0 ? data[data.length - 1].id : 0;
    return maxId + 1;
  };

app.get("/tasks", (req, res) => {
  res.json(data);
});

app.get("/tasks/:id", (req, res) => {
    const id = Number(req.params.id)
    const task = data.find(task => task.id === id)
    if (task) {
        res.json(task)
    }
    res.status(404).end()
})

app.post("/tasks", (req, res) => {
  const body = req.body;
  if (!body.description) {
    return res.status(400).json({
      error: "You must provide a description",
    });
  }
  const task = {
    id: generateId(),
    description: body.description,
    done: body.done || false,
  };
  data.push(task);
  res.json(task);
});

const PORT = 8000;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
