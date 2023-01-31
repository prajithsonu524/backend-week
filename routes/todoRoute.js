const router = require('express').Router();
const {
    getTasks,
    postTask,
    deleteTask,
    updateTaskStatus
} = require('../controllers/toDoController');

router.get('/todo', getTasks);
router.post('/todo', postTask);
router.delete('/todo/:id', deleteTask);
router.put('/todo/:id', updateTaskStatus);


module.exports = router;
