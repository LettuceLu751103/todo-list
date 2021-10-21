const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars');
// 引用 body-parser
const bodyParser = require('body-parser')

const Todo = require('./models/todo');
const todo = require('./models/todo');
const app = express()

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(bodyParser.urlencoded({ extended: true }))
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


app.get('/todos/new', (req, res) => {
  res.render('new')
})

app.post('/todos', (req, res) => {
  const name = req.body.name       // 從 req.body 拿出表單裡的 name 資料
  return Todo.create({ name })     // 存入資料庫
    .then(() => res.redirect('/')) // 新增完成後導回首頁
    .catch(error => console.log(error))
})


app.get('/todos/:id', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then((todo) => res.render('detail', { todo }))
    .catch(error => console.log(error))
})

app.get('/todos/:id/edit', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then((todo) => {
      res.render('edit', { todo })
    })
    .catch(error => {
      console.log(error)
    })

})

// 更新功能
app.post('/todos/:id/edit', (req, res) => {
  const id = req.params.id
  const { name, isDone } = req.body
  return Todo.findById(id)
    .then(todo => {
      todo.name = name
      todo.isDone = isDone === 'on'
      return todo.save()
    })
    .then(() => {
      res.redirect(`/todos/${id}`)
    })
    .catch(error => {
      console.log(error)
    })

})

app.post('/todos/:id/delete', (req, res) => {
  const id = req.params.id

  // 查詢該筆資料
  return Todo.findById(id)
    .then(todo => {
      todo.remove()
    })
    .then(() => {
      res.redirect('/')
    })
    .catch(error => {
      console.log(error)
    })
})


// setting up port 3000 for service
app.listen('3000', () => {
  console.log('App is running on http://localhost:3000')
})