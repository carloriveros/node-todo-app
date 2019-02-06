require('./config/config')

const _ = require('lodash');
var express = require('express');
var bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate')

var app = express();
const port = process.env.PORT || 3000

app.use(bodyParser.json());

app.post('/todos',authenticate, (req,res) => {
    var todo = new Todo({
      text:req.body.text,
      _creator:req.user._id
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

app.get('/todos',authenticate, (req,res) => {
  Todo.find({
    _creator:req.user._id
  }).then((todos) => {
    res.send({todos})
  }, (e) => {
    res.status(400).send(e);
  })
})

app.get('/todos/:id',authenticate,(req,res) => {
  if(!ObjectID.isValid(req.params.id)){
    console.log("id not valid")
    res.status(400).send()
  }else{
    Todo.findOne({
      _id:req.params.id,
      _creator:req.user._id
    }).then( (todo) => {
      if(!todo){
        console.log('Id not found')
        res.status(404).send()
      }
      console.log('Todo by id',todo);
      res.send({todo});
    }).catch((e) => res.status(400).send())
  }
})

app.delete('/todos/:id',authenticate,(req,res) => {
  if(!ObjectID.isValid(req.params.id)){
    console.log("id not valid")
    res.status(400).send()
  }else{
    Todo.findOneAndRemove({
      _id:req.params.id,
      _creator:req.user._id
    }).then( (todo) => {
      if(!todo){
        console.log('Id not found')
        res.status(404).send()
      }
      console.log('Removed todo',todo);
      res.send({todo});
    }).catch((e) => res.status(400).send())
  }
})

app.patch('/todos/:id',authenticate,(req,res) => {
  var id = req.params.id;
  var body = _.pick(req.body,['text','completed']);

  if(!ObjectID.isValid(id)){
    console.log("id not valid")
    res.status(400).send()
  }

  if(_.isBoolean(body.completed) && body.completed){
    body.completedAt = new Date().getTime();
  }else{
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findOneAndUpdate({
    _id:id,
    _creator:req.user._id
  },{$set:body},{new:true}).then( (todo) => {
    if(!todo){
      console.log('Id not found')
      res.status(404).send()
    }
    console.log('Updated todo',todo);
    res.send({todo});
  }).catch((e) => res.status(400).send())


})

//POST USER
app.post('/users', (req,res) => {

  var body = _.pick(req.body,['email','password']);
  var user = new User(body);

  user.save().then(() => {
    return user.generateAuthToken();
  }).then((token) => {
    res.header('x-auth',token).send(user)
  }).catch((e) =>{
   console.log(e);
   console.log('Unable to save user')
   res.status(400).send({error:"unable to save user"});
 })
})



app.get('/users/me',authenticate,(req,res) => {
  res.send(req.user)
})

app.post('/users/login',(req,res) => {
  var body = _.pick(req.body,['email','password']);
  User.findByCredentials(body.email,body.password).then((user) => {
    return user.generateAuthToken().then((token) => {
      res.header('x-auth',token).send(user)
    })
  }).catch((err) => {
    res.status(400).send();
  })
})

app.delete('/users/me/token',authenticate,(req,res) => {
  req.user.removeToken(req.token).then(() => {
    res.status(200).send();
  },() => {
    res.status(400).send();
  })
})

app.listen(port, () => {
  console.log(`started at port ${port}`)
})

module.exports = {app};
