const express = require('express');
const app = express();
const port = 3000;

const router=require('./routes/todoRoute');
app.use(express.json()); //very very important

app.use('/todo', router);


app.listen(port, () => {
    console.log('server listening at port', port);
});

/// dont use let and ==