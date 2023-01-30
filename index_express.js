const express = require('express');
const app = express();
const port = 3000;

app.use(express.json()); //very very important

app.use('/todo', require('./routes/todoRoute'));


app.listen(port, () => {
    console.log('server listening at port', port);
});

/// dont use let and ==