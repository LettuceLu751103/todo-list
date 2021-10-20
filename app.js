const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars');

const Todo = require('./models/todo')
const app = express()

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// connect to the mongoDB
mongoose.connect('mongodb://localhost/todo-list', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})


// setting up homepage route
app.get('/', (req, res) => {
  // res.send('hello world')

  Todo.find()
    .lean()
    .then(todos => res.render('index', { todos }))
    .catch(error => console.log('error'))


})


// setting up port 3000 for service
app.listen('3000', () => {
  console.log('App is running on http://localhost:3000')
})