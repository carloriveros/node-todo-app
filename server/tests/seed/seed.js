const {ObjectID} = require('mongodb');
const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');

const users = [{
  
},{

}]

const todos = [{
  '_id': new ObjectID(),
  'text': 'First test todo'
},{
  '_id': new ObjectID(),
  'text': 'Second test todo',
  'completed':true,
  'completedAt':1236546734
}]

const populateTodos = (done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => done());
}

module.exports = {todos,populateTodos};
