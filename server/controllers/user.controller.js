const { useRef } = require("react")
const User = require("../models/user.model")
const bcrypt = require('bcrypt');


const testconnection = (req, res) => {
    res.json({ status: "Okay connection" })
}

const findAllUser = (req, res) => {
    User.find({}, '-user_password')
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


const createUser = async (req, res) => {
    try {
        const { user_password, ...rest } = req.body;

        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user_password, salt);

        
        const newUser = await User.create({
            ...rest,
            user_password: hashedPassword
        });

        res.json({ user: newUser, status: 'Okay' });
    } catch (err) {
        res.json({ message: 'Something went wrong with creating', err });
    }
};

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