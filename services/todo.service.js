// const tasksInstanceFunction = require('../database/models/tasks');
const { Tasks } = require('../database/models');
// const Tasks = tasksInstanceFunction(db.sequelize, db.Sequelize.DataTypes);

const getAll = async () => {
  try {
    const todoList = await Tasks.findAll();
    return todoList;
  }
  catch (err) {
    console.log(err);
  }
};

const deleteTask = async (id) => {
  const ToDoTasks = await Tasks.destroy({
    where: {
      id: id
    }
  });

  if (!ToDoTasks) return false;
  return true;
};

const updateTaskStatus = async (isComplete, id) => {
  const ToDoTasks = await Tasks.update({
    isComplete: isComplete
  },
    {
      where: {
        id: id
      }


    });
  if (!ToDoTasks) return false;
  return true;
};

const postTask = async (name) => {
  const ToDoTasks = await Tasks.create({
    name: name,
    isComplete: false
  });
  if (!ToDoTasks) return false;
  return true;
};

module.exports = {
  getAll, deleteTask, updateTaskStatus, postTask
};
