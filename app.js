var express = require('express');

var todoController = require('./controllers/todoController');

var app = express();

//setting template engine
app.set('view engine', 'ejs');

//static files
app.use(express.static('./public'));

//controllers
todoController(app);

app.listen(process.env.PORT || 3000)
console.log('You are listening to port 3000');
