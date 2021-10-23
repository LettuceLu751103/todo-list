const mongoose = require('mongoose')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const MONGODB_URL = process.env.MONGODB_URI

mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection



// db.on('error', () => {
//   console.log('mongodb error!')

// })

// db.once('open', () => {
//   console.log('mongodb connected!')
// })

console.log('inside mongoose')

console.log('leave mongoose')