//instantiating tasks
const {DataTypes}=require('sequelize');
const tasksInstanceFunction = require('../database/models/tasks');
const db=require('../database/models/index');

const Tasks=tasksInstanceFunction(db.sequelize,DataTypes);
module.exports=Tasks;

// (async () => {
//     const ToDo = await Tasks.build({
//         name: 'buy medicines',
//         isComplete: false
    
//     });
//     await ToDo.save();
//     console.log('TODO saved to database');
   
//     console.log('id given by db',ToDo.id);
//     // Code here`
//   })();
