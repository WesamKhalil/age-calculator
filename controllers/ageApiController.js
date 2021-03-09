const User = require('../models/user')

const errorHandler = () => {
    
}

//Route for getting a specific individual
const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        res.json({user})
    } catch(error) {
        res.status(400).json({ error_message: "User ID doesn't exist." })
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
        res.status(400).json({ error_message: error.errors.date.properties.message })
    }
}

//Updates User information by passind id and new information in body
const updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { runValidators: true })
        res.sendStatus(200)
    } catch(error) {
        res.status(400).json({ error_message: error.errors.date.properties.message })
    }
}

//Route for deleting a specific document by passing in it's id
const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        res.json({user})
    } catch(error) {
        res.sendStatus(400)
    }
}

module.exports = { getUser, getAllUsers, addUser, updateUser, deleteUser }