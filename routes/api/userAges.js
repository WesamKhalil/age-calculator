const express = require("express")
const router = express.Router()
const User = require("../../models/user")

//Route for getting a specific individual
router.get("/individual/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        res.json({user})
    } catch(error) {
        res.status("400").json({error})
    }
})

//Route for retrieving all the user documents
router.get("/", async (req, res) => {
    try {
        const users = await User.find().sort({updatedAt: "desc"})
        res.json({users})
    } catch(error) {
        res.status("400").json({error})
    }
})

//Adds a User document to database
router.post("/", async (req, res) => {
    try {
        const user = await User.create(req.body)
        res.json({user})
    } catch(error) {
        res.status("400").json({error})
    }
})

//Updates User information by passind id and new information in body
router.put("/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body)
        res.json({user})
    } catch(error) {
        res.status("400").json({error})
    }
})

//Route for deleting a specific document by passing in it's id
router.delete("/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        res.json({user})
    } catch(error) {
        res.status("400").json({error})
    }
})


module.exports = router