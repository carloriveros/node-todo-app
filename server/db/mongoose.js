var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

//localhost:  mongodb://localhost:27017/TodoApp

mongodb://<dbuser>:<dbpassword>@ds221405.mlab.com:21405/test-todo-carlo
mongoose.connect('mongodb://carlorm:archer37@ds221405.mlab.com:21405/test-todo-carlo');

module.exports = {mongoose};
