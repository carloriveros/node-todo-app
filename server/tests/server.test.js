const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {todos,populateTodos} = require('./seed/seed');


beforeEach(populateTodos)

describe('POST /todos', () => {
  it('should create a new todo', (done) =>{
    var text = 'Test todo text';
  request(app)
    .post('/todos')
    .send({text})
    .expect(200)
    .expect((res) =>{
      expect(res.body.text).toBe(text);
    })
    .end((err,res) => {
      if(err){
        return done(err);
      }
      Todo.find().then((todos) => {
        expect(todos.length).toBe(3);
        expect(todos[2].text).toBe(text);
        done();
      }).catch((e) => done(e))
    })
  })

  it('should not create a todo with invalid body data', (done) => {
    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err,res) => {
        if(err){
          return done(err);
        }
        Todo.find().then((todos) => {
          expect(todos.length).toBe(2);
          done();
        }).catch((e) => done(e))
      })
  })
})

describe('GET /todos', () => {
  it('should get all todos', (done) => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(2)
      })
      .end(done);
  })
})

describe('GET /todos/:id', () => {
  it('should return a todo',(done) =>{
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect( (res) => {
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end(done);
  })

  it('should return 404 if todo not found', (done) => {
    request(app)
      .get(`/todos/5c5996413056a65617844366`)
      .expect(404)
      .end(done)

  })

  it('should return 400 for non-object ids', (done) => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}222222`)
      .expect(400)
      .end(done)
  })
})

describe('DELETE /todos/:id', () => {
  it('should remove a todo',(done) =>{
    request(app)
      .delete(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect( (res) => {
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end((err,res) => {
        if(err){
          return done(err)
        }
        Todo.findById(res.body.todo.id).then( (todo) => {
          expect(todo).toNotExist();
          done();
        }).catch((e) => done(e))

      });
  })

  it('should return 404 if todo not found', (done) => {
    request(app)
      .delete(`/todos/5c5996413056a65617844366`)
      .expect(404)
      .end(done)

  })

  it('should return 400 for non-object ids', (done) => {
    request(app)
      .delete(`/todos/${todos[0]._id.toHexString()}222222`)
      .expect(400)
      .end(done)
  })
})

describe('PATCH /todos/:id', () => {

  it('should update the todo', (done) => {
    var id = todos[0]._id
    request(app)
    .patch(`/todos/${id}`)
    .send({text:"new update",completed:true})
    .expect(200)
    .expect( (res) => {
      expect(res.body.todo.text).toBe("new update");
      expect(res.body.todo.completed).toBe(true);
      expect(res.body.todo.completedAt).toBeA("number");
    })
    .end(done)
  })

  it('should completedAt is null in false completed update', (done) => {
    var id = todos[1]._id
    request(app)
    .patch(`/todos/${id}`)
    .send({text:"new update2",completed:false})
    .expect(200)
    .expect( (res) => {
      expect(res.body.todo.text).toBe("new update2");
      expect(res.body.todo.completed).toBe(false);
      expect(res.body.todo.completedAt).toNotExist();
    })
    .end(done)

  })

  it('should return 404 if todo not found', (done) => {
    request(app)
      .patch(`/todos/5c5996413056a65617844366`)
      .expect(404)
      .end(done)

  })

  it('should return 400 for non-object ids', (done) => {
    request(app)
      .patch(`/todos/${todos[0]._id.toHexString()}222222`)
      .expect(400)
      .end(done)
  })
})
