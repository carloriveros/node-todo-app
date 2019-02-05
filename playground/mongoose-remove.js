const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user')

// Todo.remove({}) //remove everything
Todo.remove({}).then((result) => {
  console.log(result);
})

Todo.findOneAndRemove({}).then((todo) => {

})
Todo.findByIdAndRemove('asfd').then((todo) => {

})
