/* eslint-disable quotes */
const Services = require("../services/todo.service");
const joi = require("joi");


const getTasks = async (req, res) => {


    //create middleware to validate the request body
    try {
        const todoList = await Services.getAll();
        if (!todoList) return res.status(404).json({ message: "Task not found" });
        return res.status(200).send(todoList);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const postTask = async (req, res) => {
    const schema = joi.object({
        name: joi.string()
            .required()
        ,
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: "Task name must be a string" });
    }
    else {

        try {
            const name = req.body.name;
            // if (typeof name != "string")
            //     return res.status(400).json({ message: "Task name must be a string" });
            const ToDoTasks = await Services.postTask(name);
            if (!ToDoTasks) return res.status(404).json({ message: "Task not added" });
            return res.status(200).json({ message: "Task added successfully" });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

};

const deleteTask = async (req, res) => {
    try {
        const task_id = req.params.id;
        if (typeof task_id != "number")
            return res.status(400).json({ message: "Task id must be an integer" });
        const ToDoTasks = await Services.deleteTask(task_id);

        if (!ToDoTasks) return res.status(404).json({ message: "Task not found" });
        return res.status(200).json({ message: "Task deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }

};

const updateTaskStatus = async (req, res) => {
    try {
        const task_id = req.params.id;
        const isComplete = req.body.isComplete;
        const ToDoTasks = await Services.updateTaskStatus(isComplete, task_id);
        if (!ToDoTasks) return res.status(404).json({ message: "Task not found" });
        return res.status(200).json({ message: "Task updated successfully" });
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
