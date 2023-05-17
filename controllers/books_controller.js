// dependencies
const express = require('express')
const books = express.Router()
const Book = require('../models/book.js')

// seed
books.get('/seed', (req , res) => {
    Book.insertMany([{
        "title": "The Shinobi Initiative",
        "description": "The reality-bending adventures of a clandestine service agency in the year 2166",
        "year": 2014,
        "quantity": 10,
        "imageURL": "https://imgur.com/LEqsHy5.jpeg"
      },
      {
        "title": "Tess the Wonder Dog",
        "description": "The tale of a dog who gets super powers",
        "year": 2007,
        "quantity": 3,
        "imageURL": "https://imgur.com/cEJmGKV.jpg"
      },
      {
        "title": "The Annals of Arathrae",
        "description": "This anthology tells the intertwined narratives of six fairy tales.",
        "year": 2016,
        "quantity": 8,
        "imageURL": "https://imgur.com/VGyUtrr.jpeg"
      },
      {
        "title": "W∀RP",
        "description": "A time-space anomaly folds matter from different points in earth's history in on itself, sending six unlikely heroes on a race against time as worlds literally collide.",
        "year": 2010,
        "quantity": 4,
        "imageURL": "https://imgur.com/qYLKtPH.jpeg" 
    }])
        .then(() => {res.status(200).json({
                message: 'Seed successful'
            })
        })
        .catch((err) => {res.status(400).json({
                message: 'Seed unsuccessful',
                error: err
            })
        })
})

// index 
books.get('/', (req, res) => {
    Book.find()
    .then(foundBooks => {
        console.log(req.body)
        res.status(200).json(foundBooks)
    })
    .catch(err => {
        res.status(400).json({
            message: "error occurred, could not get all books"
        })
    })
})

// show
books.get('/:id', (req, res) => {
    Book.findById(req.params.id)
    .then(foundBooks => {
        console.log(req.body)
        res.status(200).json(foundBooks)
    })
    .catch(err => {
        res.status(400).json({
            message: "error occurred, could find the book"
        })
    })
})

// update
books.put('/:id', (req, res) => {
    Book.findByIdAndUpdate(req.params.id, req.body)
        .then(updatedBook => {
            console.log(req.body)
            res.status(200).json(updatedBook)
        })
        .catch(err => {
            res.status(400).json({
                message: "error occurred, could not update the book"
            })
        })
})

// delete
books.delete('/:id', (req, res) => {
    Book.findByIdAndDelete(req.params.id)
        .then(deletedBook => {
            res.status(200).json({
                message: 'Delete successful'
            })
        })
        .catch(err => {
            res.status(400).json({
                message: "error occurred, could not delete the book"
            })
        })
})

// create
books.post('/', (req, res) => {
    Book.create(req.body)
        .then(createdBook => {
            console.log(req.body)
            res.status(200).json(createdBook)
        })
        .catch(err => {
            res.status(400).json({
                message: 'error occurred, could not create book'
            })
        })
})

// export
module.exports = books