const requestBodyValidator = require('../middlewares/todo.validator');
const router = require('express').Router();
const {
    getTasks,
    postTask,
    deleteTask,
    updateTaskStatus
} = require('../controllers/toDoController');

router.get('/todo', getTasks)
    .post('/todo', requestBodyValidator, postTask);


router.delete('/todo/:id', deleteTask)
    .put('/todo/:id', updateTaskStatus);


module.exports = router;
