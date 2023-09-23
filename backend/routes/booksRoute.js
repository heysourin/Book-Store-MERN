const express = require('express')
const Book = require('../models/bookModels')
const router = express()

//get all the books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find({})

    return res.status(200).json({
      count: books.length,
      data: books,
    })
  } catch (error) {
    console.log(error.message)
    res.status(500).send({ message: error.message })
  }
})

//Create a book
router.post('/', async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: 'Send all required fields: title, author, publishYear',
      })
    }

    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    }

    const book = await Book.create(newBook)

    return res.status(201).send(book)
  } catch (error) {
    console.log(error.message)
    res.status(500).send({ message: 'hehe  ' + error.message })
  }
})

//Route to find a book
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params

    const book = await Book.findById(id)

    return res.status(200).json(book)
  } catch (error) {
    console.log(error.message)
    res
      .status(500)
      .send({ message: 'Bood id get request error: ' + error.message })
  }
})

//Route to update a book
router.put('/:id', async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: 'Send all required fields: title, author, publishYear',
      })
    }

    const { id } = req.params

    const result = await Book.findByIdAndUpdate(id, req.body)

    if (!result) {
      return res.status(404).json({ message: 'Book not found' })
    }
    return res.status(200).json({ message: 'Book updated successfully' })
  } catch (error) {
    console.log(error.message)
    res
      .status(500)
      .send({ message: 'Bood id put request error: ' + error.message })
  }
})

//Delete a book
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const result = await Book.findByIdAndDelete(id)
    if (!result) {
      return res.status(404).json({ message: 'Book not found' })
    }
    return res.status(200).json({ message: 'Book deleted successfully' })
  } catch (error) {
    console.log(error.message)
    res
      .status(500)
      .send({ message: 'Bood id delete request error: ' + error.message })
  }
})

module.exports = router
