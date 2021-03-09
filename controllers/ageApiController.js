const User = require('../models/user')

const errorHandler = (error) => {
    if(error._message === "user validation failed") {
        let newError = { name: null, hours: null, date: null, general: null }
        Object.keys(error.errors).forEach(errorName => {
            const message = error.errors[errorName].message
            newError[errorName] = message
        })
        return { error_message: newError }
    } else if(error.kind === "ObjectId") {
        return { error_message: { general: "User ID doesn't exist." } }
    }
}

//Route for getting a specific individual
const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        res.json(user)
    } catch(error) {
        const newError = errorHandler(error)
        res.status(404).json(newError)
    }
}

//Route for retrieving all the user documents
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().sort({updatedAt: "desc"})
        res.json({users})
    } catch(error) {
        res.sendStatus(400)
    }
}

//Adds a User document to database
const addUser = async (req, res) => {
    try {
        const user = await User.create(req.body)
        res.json({user})
    } catch(error) {
        const newError = errorHandler(error)
        res.status(400).json(newError)
    }
}

//Updates User information by passind id and new information in body
const updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { runValidators: true })
        res.sendStatus(200)
    } catch(error) {
        const newError = errorHandler(error)
        res.status(400).json(newError)
    }
}

//Route for deleting a specific document by passing in it's id
const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        res.json({user})
    } catch(error) {
        res.sendStatus(404)
    }
}

module.exports = { getUser, getAllUsers, addUser, updateUser, deleteUser }