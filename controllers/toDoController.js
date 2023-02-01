
const Services = require('../services/todo.service');
const HTTPError = require('../utilities/todo.utility');

const getTasks = async (req, res) => {

    try {
        const todoList = await Services.getAll();
        if (todoList == null) throw new HTTPError('Internal Server Error', 500);
        if (JSON.stringify(todoList) == '{}') throw new HTTPError('Task not found', 400);//doubt
        return res.status(200).send(todoList);
    } catch (err) {
        if (err instanceof HTTPError) {
            res.status(err.code).json({ message: err.message });
        } //else {
        //     res.status(500).json({ message: 'Internal Server Error' });
        // }
    }
};

const postTask = async (req, res) => {


    try {
        const name = req.body.name;

        const ToDoTasks = await Services.postTask(name);
        if (!ToDoTasks) throw new HTTPError('Task not added', 404);
        return res.status(200).json({ message: 'Task added successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }


};

const deleteTask = async (req, res) => {
    try {
        const task_id = req.params.id;
        if (typeof task_id != 'number')
            return res.status(400).json({ message: 'Task id must be an integer' });
        const ToDoTasks = await Services.deleteTask(task_id);

        if (!ToDoTasks) return res.status(404).json({ message: 'Task not found' });
        return res.status(200).json({ message: 'Task deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }

};

const updateTaskStatus = async (req, res) => {
    try {
        const task_id = req.params.id;
        const isComplete = req.body.isComplete;
        const ToDoTasks = await Services.updateTaskStatus(isComplete, task_id);
        if (!ToDoTasks) return res.status(404).json({ message: 'Task not found' });
        return res.status(200).json({ message: 'Task updated successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getTasks,
    postTask,
    deleteTask,
    updateTaskStatus,
};
