const express = require('express')
const mongoose = require('mongoose')

const app = express()


// connect to the mongoDB
mongoose.connect('mongodb://localhost/todo-list')

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})


// setting up homepage route
app.get('/', (req, res) => {
  res.send('hello world')
})


// setting up port 3000 for service
app.listen('3000', () => {
  console.log('App is running on http://localhost:3000')
})