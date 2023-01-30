const router = require('express').Router();
const {
    getTasks,
    postTask,
    deleteTask,
    updateTaskStatus
}=require('../controllers/toDoController');

router.get('/get',getTasks);
router.get('/post',postTask);
router.delete('/delete/:id',deleteTask);
router.post('/update/:id',updateTaskStatus);

module.exports=router;
