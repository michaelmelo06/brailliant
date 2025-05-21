const { useRef } = require("react")
const Admin = require("../models/admin.model")


const testconnection = (req, res) => {
    res.json({ status: "Okay connection" })
}

const findAllAdmin = (req, res) => {
    Admin.find()
        .then((allAdmin) => {
            res.json({ admins: allAdmin })
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

const createAdmin = (req, res) => {
    Admin.create(req.body)
        .then((newAdmin) => {
            res.json({ admin: newAdmin, status: 'Okay' })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong with creating', err })
        })
}

const updateAdmin = (req, res) => {
    User.findByIdAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true, runValidators: true })
        .then((updatedAdmin) => {
            res.json({ admin: updatedAdmin, status: 'Updated Successfuly' })
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

module.exports = { testconnection, createAdmin, findAllAdmin, updateAdmin }