const { useRef } = require("react")
const RequestBook = require("../models/requst_book.model");


const testconnection = (req, res) => {
    res.json({ status: "Okay connection" })
}

const findAllRequestBooks = (req, res) => {
    RequestBook.find()
        .then((allBooks) => {
            res.json({ books: allBooks })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', err })
        })
}

const findRequestBookByName = (req, res) => {
    RequestBook.findOne({ name: req.params.namex })
        .then((theBook) => {
            res.json({ book: theBook })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', err })
        })
}

const createRequestBook = (req, res) => {
    RequestBook.create(req.body)
        .then((newBook) => {
            res.json({ book: newBook, status: 'Okay' })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong with creating', err })
        })

}


const updateRequestBook = (req, res) => {
    RequestBook.findByIdAndUpdate(
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

const deleteRequestBook = (req, res) => {
    RequestBook.findByIdAndDelete({ _id: req.params.id })
        .then((result) => {
            res.json({ useRef: result, status: 'Deleted Successfuly' })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong with creating', err })
        })
}


module.exports = { testconnection, deleteRequestBook, updateRequestBook, findRequestBookByName, findAllRequestBooks, createRequestBook }