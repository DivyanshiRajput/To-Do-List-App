var bodyParser = require('body-parser');

var mongoose = require('mongoose');

var dbURI = 'mongodb+srv://admin:1234@todolist.tzugu.mongodb.net/todolist?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true})
  .then((result) => console.log("connected to db"))
  .catch((err) => console.log(err));

var todoSchema = new mongoose.Schema({
  item: String
});

var Todo = mongoose.model('Todo', todoSchema);

var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app){

  app.get('/todo', function(req,res){
    // get data from db
    Todo.find({}, function(err, data){
      if (err) throw err;
      res.render('todo', {todos: data});
    })

  });

  app.post('/todo', urlencodedParser, function(req,res){
    // console.log('posting data');
    //get data from input add it to db
    var newItem = Todo(req.body).save(function(err, data){
      if (err) throw err;
      res.json(data);
    })
  });

  app.delete('/todo/:item', function(req,res){
    // console.log('deleting data');
    //delete the item form db
    Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
      if (err) throw err;
      res.json(data);
    })
  });
};
