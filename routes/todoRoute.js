const router = require('express').Router();
const {
    getTasks,
    // postTask,
    deleteTask,
    // updateTaskStatus
}=require('../controllers/toDoController');

router.get('/get',getTasks);
// router.post('/post',postTask);
 router.delete('/delete/:id',deleteTask);
// router.put('/update/:id',updateTaskStatus);

module.exports=router;
