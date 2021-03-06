const express = require("express")
const app = express()
const mongoose = require("mongoose")
const userRoutes = require("./routes/api/userAges")
require("dotenv").config()


//Connect to the MongoDB through their online application MongoDB Atlas
mongoose.connect(process.env.MONGOURL, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false})
    .then(res => console.log("Connected to MongoDB"))

//Middleware to parse data sent from client, extracts the body and appends it to the request
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(express.static(__dirname + "/client/dist"))

//Api for the SPA
app.use("/api/userAges", userRoutes)

app.get(["/", "/list", /\/edit-age(\/:id)?/], (req, res) => {
    res.sendFile(__dirname + "/client/dist/index.html")
})

//Port number, default is 3000
const port = process.env.PORT || 3000
//Telling Node to listen to a port
app.listen(port, () => {
    console.log(`Listening on port ${port}.`)
})