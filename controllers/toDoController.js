const Tasks=require('../Services/todoServices');


const getTasks = async (req, res) => {
    const todoList = await Tasks.findAll();
    console.log(todoList);
    res.json(todoList);
};

// const postTask = (req, res) => {
//     // data.push({
//     //     'id': id++,
//     //     'name': req.body.name,
//     //     'isCompleted': false
//     // });
//     data.push({
//         ...req.body.name, //*********** */
//         id: id++,
//         isCompleted: false
//     });
//     res.json(data);
// };



const deleteTask = async (req, res) => {

    const task_id=req.params.id;
    console.log(task_id);
     const ToDoTasks= await Tasks.destroy({
        where: {
            id:task_id
        }});
    res.json(ToDoTasks);

};

module.exports = {
    getTasks,
    // postTask,
    deleteTask,
    // updateTaskStatus
};





