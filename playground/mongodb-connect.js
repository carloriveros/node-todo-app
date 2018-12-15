//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err,db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server')
  }
  console.log('Connected to MongoDB server')

  // db.collection('Todos').insertOne({
  //   text: 'Something to do 2',
  //   completed: false
  // }, (err,result) => {
  //   if(err){
  //     return console.log(err)
  //   }
  //   console.log(JSON.stringify(result.ops,undefined,2))
  // })
  // db.collection('Users').insertOne({
  //   name: 'Carlo Riveros',
  //   age: 24,
  //   location: 'Barranquilla'
  // }, (err,result) => {
  //   if(err){
  //     return console.log(err)
  //   }
  //   console.log(JSON.stringify(result.ops,undefined,2))
  // })
  // db.collection('Todos').find({
  //   _id : new ObjectID('5c145301c4eceb3e9265c19e')
  // }).toArray().then( (docs) => {
  //   console.log('Todos');
  //   console.log(JSON.stringify(docs,undefined,2))
  // }, (err) => {
  //   console.log('Unable to fetch ',err)
  // })
  // db.collection('Todos').find().count().then( (count) => {
  //   console.log('Todos count: ',count);
  // }, (err) => {
  //   console.log('Unable to fetch ',err)
  // })
  db.collection('Users').find({
    name : 'Carlo Riveros'
  }).toArray().then( (docs) => {
    console.log('Users');
    console.log(JSON.stringify(docs,undefined,2))
  }, (err) => {
    console.log('Unable to fetch ',err)
  })
  //db.close();
});
