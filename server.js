// Dependencies
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()

// config/middleware
require('dotenv').config()
const PORT = process.env.PORT
app.use(express.json())
app.use(cors())

// mongoose
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('connected to mongo on: ', process.env.MONGO_URI)
    })
    .catch((err) => {
        console.error('error connecting to MongoDB', err)
    })

// index route
app.get('/', (req, res) => {
    res.send('Hello World')
})

// controller
const booksController = require('./controllers/books_controller.js')
app.use('/books', booksController)

// listen
app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`)
})