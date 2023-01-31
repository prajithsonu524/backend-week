
const Services = require('../services/todo.service');

const getTasks = async (req, res) => {
    const todoList = await Services.getAll();
    console.log(todoList);
    res.json(todoList);
};

const postTask = (req, res) => {
    const name = req.body.name;
    const ToDoTasks = Services.postTask(name);
    if (!ToDoTasks) return res.status(404).json({ message: 'Task not found' });
    return res.status(200).json({ message: 'Task added successfully' });
};



const deleteTask = async (req, res) => {

    const task_id = req.params.id;

    const ToDoTasks = await Services.deleteTask(task_id);

    if (!ToDoTasks) return res.status(404).json({ message: 'Task not found' });
    return res.status(200).json({ message: 'Task deleted successfully' });

};

const updateTaskStatus = async (req, res) => {
    const task_id = req.params.id;
    const isComplete = req.body.isComplete;
    const ToDoTasks = await Services.updateTaskStatus(isComplete, task_id);
    if (!ToDoTasks) return res.status(404).json({ message: 'Task not found' });
    return res.status(200).json({ message: 'Task updated successfully' });
};

module.exports = {
    getTasks,
    postTask,
    deleteTask,
    updateTaskStatus
};





