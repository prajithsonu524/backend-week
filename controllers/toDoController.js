var data = [{
    id: 1,
    name: 'complete homework',
    isCompleted: true,
},
{
    id: 2,
    name: 'buy veggies',
    isCompleted: false,
},
{
    id: 3,
    name: 'watch series',
    isCompleted: true,
},];
var id = 4;


const getTasks = (req, res) => {

    res.json(data);
};

const postTask = (req, res) => {
    // data.push({
    //     'id': id++,
    //     'name': req.body.name,
    //     'isCompleted': false
    // });
    data.push({
        ...req.body.name, //*********** */
        id: id++,
        isCompleted: false
    });
    res.json(data);
};



const deleteTask = (req, res) => {

    let updated_data = data.filter((task) => {
        return task.id != req.params.id;
    });
    data = updated_data;
    res.json(data);
};
const updateTaskStatus = (req, res) => {
    var objIndex = data.findIndex(obj => obj.id == req.params.id);

    data[objIndex].isCompleted = req.body.isCompleted;
    res.json(data);

};

module.exports = {
    getTasks,
    postTask,
    deleteTask,
    updateTaskStatus
};





