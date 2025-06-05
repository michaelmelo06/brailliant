const { useRef } = require("react")
const Section = require("../models/section.model")


const testconnection = (req, res) => {
    res.json({ status: "Okay connection" })
}

const findAllSection = (req, res) => {
    Section.find()
        .then((allSection) => {
            res.json({ sections: allSection })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', err })
        })
}

const findSectionByName = (req, res) => {
    Section.findOne({ _id: req.params.namex })
        .then((theSection) => {
            res.json({ section: theSection })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', err })
        })
}

const findSectionById = (req, res) => {
    Section.findById(req.params._id)
        .then((theSection) => {
            res.json({ section: theSection });
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong', err });
        });
};

const createSection = (req, res) => {
    Section.create(req.body)
        .then((newSection) => {
            res.json({ section: newSection, status: 'Okay' })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong with creating', err })
        })
}

const updateSection = (req, res) => {
    Section.findByIdAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true, runValidators: true })
        .then((updatedSection) => {
            res.json({ section: updatedSection, status: 'Updated Successfuly' })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong with creating', err })
        })
}

const deleteSection = (req, res) => {
    Section.findByIdAndDelete({ _id: req.params.id })
        .then((result) => {
            res.json({ useRef: result, status: 'Deleted Successfuly' })
        })
        .catch((err) => {
            res.json({ message: 'Something went wrong with creating', err })
        })
}

const getSectionCount = async (req, res) => {
    try {
        const count = await Section.countDocuments();
        res.json({ count });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { findAllSection, testconnection, createSection, updateSection, deleteSection, findSectionByName, getSectionCount, findSectionById }