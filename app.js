const express = require('express')

const app = express()

// setting up homepage route
app.get('/', (req, res) => {
  res.send('hello world')
})


// setting up port 3000 for service
app.listen('3000', () => {
  console.log('App is running on http://localhost:3000')
})