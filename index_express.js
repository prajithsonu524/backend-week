const express = require('express');
const app = express();
const port = 3000;

app.use(express.json()); //very very important
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


app.route('/tasks')
    .get((req, res) => {

        res.json(data);
    })
    .post((req, res) => {
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
    });


app.route('/tasks/:id')
    .delete((req, res) => {

        let updated_data = data.filter((task) => {
            return task.id != req.params.id;
        });
        data = updated_data;
        res.json(data);
    })
    .put((req, res) => {
        var objIndex = data.findIndex(obj => obj.id == req.params.id);

        data[objIndex].isCompleted = req.body.isCompleted;
        res.json(data);

    });





app.listen(port, () => {
    console.log('server listening at port', port);
});

/// dont use let and ==