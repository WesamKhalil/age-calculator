const mongoose = require("mongoose")

//User Schema with a name, date of brith and age property
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("user", userSchema)