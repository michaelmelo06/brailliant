const { useRef } = require("react")
const User = require("../models/user.model")


const testconnection = (req, res) => {
    res.json({ status: "Okay connection" })
}

const findAllUser = (req, res) => {
    User.find()
        .then((allUser) => {
            res.json({ users: allUser })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', err })
        })
}

const findUserByName = (req, res) => {
    User.findOne({ name: req.params.namex })
        .then((theUser) => {
            res.json({ user: theUser })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', err })
        })
}

const createUser = (req, res) => {
    User.create(req.body)
        .then((newUser) => {
            res.json({ user: newUser, status: 'Okay' })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong with creating', err })
        })
}

const updateUser = (req, res) => {
    User.findByIdAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true, runValidators: true })
        .then((updatedUser) => {
            res.json({ user: updatedUser, status: 'Updated Successfuly' })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong with creating', err })
        })
}

const deleteUser = (req, res) => {
    User.findByIdAndDelete({ _id: req.params.id })
        .then((result) => {
            res.json({ useRef: result, status: 'Deleted Successfuly' })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong with creating', err })
        })
}

module.exports = { testconnection, deleteUser, updateUser, findUserByName, findAllUser, createUser }