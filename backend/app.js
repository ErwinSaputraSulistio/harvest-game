require('dotenv').config()

const express = require('express')
const app = express()
const port = process.env.PORT || 8000
const errorHandler = require('./modules/middlewares/errorHandler')
const routes = require('./routes')
const cors = require('cors')

app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(routes)

app.use(errorHandler)

app.listen(port, () => {
  console.log('Listening on port ', port)
})
