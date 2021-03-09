const express = require('express')
const router = express.Router()
const { getUser, getAllUsers, addUser, updateUser, deleteUser } = require('../../controllers/ageApiController')

//Route for getting a specific individual
router.get("/individual/:id", getUser)

//Route for retrieving all the user documents
router.get("/", getAllUsers)

//Adds a User document to database
router.post("/", addUser)

//Updates User information by passind id and new information in body
router.put("/:id", updateUser)

//Route for deleting a specific document by passing in it's id
router.delete("/:id", deleteUser)


module.exports = router