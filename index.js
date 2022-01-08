const express = require('express')
const app = express()

app.use(express.json())

let data = [
    {
        "description": "task No.1",
        "done": false
    },
    {
        "description": "task No.2",
        "done": false
    },
    {
        "description": "task No.3",
        "done": false
    },
    {
        "description": "task No.4",
        "done": false
    },
    {
        "description": "task No.5",
        "done": false
    }, 
  ]
app.get('/tasks', (req, res) => {
    res.json(data)    
}
)

const PORT = 8000
app.listen(PORT)
console.log(`Server running on port ${PORT}`)