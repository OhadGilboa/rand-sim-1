const express = require('express')
const router = express.Router()

const todos = []
let id = 1

router.get('/todos', function (req, res) {
    res.send(todos)
})

router.post('/todo', function (req, res) {
    const text = req.body.text
    const newTodo = { id: id++, text: text, complete: false, priority: "LOW"}

    todos.push(newTodo)
    res.send(todos)
})

router.put('/todo/:todoID', function (req, res) {
    const todoID = req.params.todoID
    
    todos.find(t => t.id == todoID).complete = 
    !todos.find(t => t.id == todoID).complete
    
    res.send(todos)
})

router.delete('/todo/:todoID', function (req, res) {
    const todoID = req.params.todoID
    todos.splice(todos.findIndex(todo => todo.id == todoID), 1)
    res.send(todos)
})

router.put('/priority/:todoID', function (req, res) {
    const todoID = req.params.todoID
    
    const todoPrio = todos.find(t => t.id == todoID).priority
    switch (todoPrio) {
        case "LOW":
            todos.find(t => t.id == todoID).priority = "MEDIUM"
            break
        case "MEDIUM":
            todos.find(t => t.id == todoID).priority = "HIGH"
            break
        case "HIGH":
            todos.find(t => t.id == todoID).priority = "LOW"
            break
    }
    
    res.send(todos)
})

module.exports = router