const { useRef } = require("react")
const Book = require("../models/book.model");


const testconnection = (req, res) => {
    res.json({ status: "Okay connection" })
}

const findAllBooks = (req, res) => {
    Book.find()
        .then((allBooks) => {
            res.json({ books: allBooks })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', err })
        })
}

const findBookByName = (req, res) => {
    Book.findOne({ name: req.params.namex })
        .then((theBook) => {
            res.json({ book: theBook })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', err })
        })
}

const createBook = (req, res) => {
    Book.create(req.body)
        .then((newBook) => {
            res.json({ book: newBook, status: 'Okay' })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong with creating', err })
        })

}


const updateBook = (req, res) => {
    Book.findByIdAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true, runValidators: true })
        .then((updatedBook) => {
            res.json({ book: updatedBook, status: 'Updated Successfuly' })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong with creating', err })
        })
}

const deleteBook = (req, res) => {
    Book.findByIdAndDelete({ _id: req.params.id })
        .then((result) => {
            res.json({ useRef: result, status: 'Deleted Successfuly' })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong with creating', err })
        })
}

module.exports = { testconnection, deleteBook, updateBook, findBookByName, findAllBooks, createBook }