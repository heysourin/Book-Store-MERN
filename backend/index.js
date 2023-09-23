const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const cors = require('cors')
const booksRoute = require('./routes/booksRoute')

const app = express()
app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
  }),
)
app.use(express.json())
dotenv.config()
const MONGODBURL = process.env.MONGODBURL
const PORT = process.env.PORT
// const Book = require('./models/bookModels')

app.use('/books', booksRoute)

mongoose
  .connect(MONGODBURL)
  .then(() => {
    console.log('App connected to database')
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`)
    })
  })
  .catch((err) => {
    console.log(err)
  })

// app.get('/', (req, res) => {
//   // console.log(req)
//   console.log('working')
//   return res.status(234).send('Welcome to online book store')
// })

// app.post('/books', async (req, res) => {
//   try {
//     if (!req.body.title || !req.body.author || !req.body.publishYear) {
//       return res.status(400).send({
//         message: 'Send all required fields: title, author, publishYear',
//       })
//     }

//     const newBook = {
//       title: req.body.title,
//       author: req.body.author,
//       publishYear: req.body.publishYear,
//     }

//     const book = await Book.create(newBook)

//     return res.status(201).send(book)
//   } catch (error) {
//     console.log(error.message)
//     res.status(500).send({ message: 'hehe  ' + error.message })
//   }
// })

// //Route to find a book
// app.get('/books/:id', async (req, res) => {
//   try {
//     const { id } = req.params

//     const book = await Book.findById(id)

//     return res.status(200).json(book)
//   } catch (error) {
//     console.log(error.message)
//     res
//       .status(500)
//       .send({ message: 'Bood id get request error: ' + error.message })
//   }
// })

// //Route to update a book
// app.put('/books/:id', async (req, res) => {
//   try {
//     if (!req.body.title || !req.body.author || !req.body.publishYear) {
//       return res.status(400).send({
//         message: 'Send all required fields: title, author, publishYear',
//       })
//     }

//     const { id } = req.params

//     const result = await Book.findByIdAndUpdate(id, req.body)

//     if (!result) {
//       return res.status(404).json({ message: 'Book not found' })
//     }
//     return res.status(200).json({ message: 'Book updated successfully' })
//   } catch (error) {
//     console.log(error.message)
//     res
//       .status(500)
//       .send({ message: 'Bood id put request error: ' + error.message })
//   }
// })

// app.delete('/books/:id', async (req, res) => {
//   try {
//     const { id } = req.params
//     const result = await Book.findByIdAndDelete(id)
//     if (!result) {
//       return res.status(404).json({ message: 'Book not found' })
//     }
//     return res.status(200).json({ message: 'Book deleted successfully' })
//   } catch (error) {
//     console.log(error.message)
//     res
//       .status(500)
//       .send({ message: 'Bood id delete request error: ' + error.message })
//   }
// })
