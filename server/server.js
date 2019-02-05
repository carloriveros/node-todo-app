var express = require('express');
var bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
const port = process.env.PORT || 3000

app.use(bodyParser.json());

app.post('/todos', (req,res) => {
    var todo = new Todo({
      text:req.body.text
    });
    todo.save().then((doc) => {
      console.log('Saved todo',doc)
      res.status(200).send(doc);
    }, (e) =>{
      console.log(e);
      console.log('Unable to save todo')
      res.status(400).send(e);
    })
})

app.get('/todos', (req,res) => {
  Todo.find().then((todos) => {
    res.send({todos})
  }, (e) => {
    res.status(400).send(e);
  })
})

app.get('/todos/:id',(req,res) => {
  if(!ObjectID.isValid(req.params.id)){
    console.log("id not valid")
    res.status(400).send()
  }else{
    Todo.findById(req.params.id).then( (todo) => {
      if(!todo){
        console.log('Id not found')
        res.status(404).send()
      }
      console.log('Todo by id',todo);
      res.send({todo});
    }).catch((e) => res.status(400).send())
  }
})

app.listen(port, () => {
  console.log(`started at port ${port}`)
})

module.exports = {app};
