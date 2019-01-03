const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err,db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server')
  }
  console.log('Connected to MongoDB server')

// db.collection('Todos').findOneAndUpdate({
//   _id: new ObjectID("5c1502db02c0c0d9b11fb4e0")
// },{
//   $set: {
//     completed:true
//   }
// },{
//     returnOriginal:false
//   }).then((result) => {
//   console.log(result)
// });

db.collection('Users').findOneAndUpdate({
  _id: new ObjectID("5c2d6e716fcc150faec3b6ae")
},{
  $set: {
    name: "new Name"
  },
  $inc: {
    age:1
  }
},{
    returnOriginal:false
  }).then((result) => {
  console.log(result)
});

});
