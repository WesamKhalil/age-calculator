const mongoose = require("mongoose")

//User Schema with a name, date of brith and age property
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter a name."],
    },
    date: {
        type: Date,
        required: [true, "Please enter an email."],
        validate: [
            { validator: isDateLower, message: "Age can't be larger than current date." },
            { validator: isDateHigher, message: "User can't be older than 117 years old." }
        ]
    }
}, {
    timestamps: true
})

function isDateHigher(date) {
    return new Date(date) < new Date()
}

function isDateLower(date) {
    return new Date().getFullYear() - new Date(date).getFullYear() < 117
}

UserModel = mongoose.model("user", userSchema)

module.exports = UserModel