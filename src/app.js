const express = require('express');
const app = express();

app.use(express.json());

let tasks = [
    { id: 1, name: 'Task 1' },
    { id: 2, name: 'Task 2' }
];

app.get('/', (req, res) => {
    res.send('Welcome to the task manager API');
});

app.get('/tasks', (req, res) => {
    res.status(200).json(tasks);
});

app.get('/tasks/:id', (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (!task) return res.status(404).send('Task not found');
    res.status(200).json(task);
});

const PORT = 3000;

app.listen(PORT, () => console.log(`API is running on port ${PORT}`));

module.exports = app;