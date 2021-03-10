const mongoose = require("mongoose")

//User Schema with a name, date of brith and age property
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter a name."],
        validate: [isValidName, "Name must only contain alphabet characters.", "alphabet only checker"]
    },
    date: {
        type: Date,
        required: [true, "Please enter a date."],
        validate: [
            { validator: isDateLower, message: "User can't be older than 117 years old." },
            { validator: isDateHigher, message: "Age can't be larger than current date." },
            { validator: hourValidator, message: "Please enter an hour between 0 and 24." }
        ]
    }
}, {
    timestamps: true
})

//Checks if name only has alphabetic characters
function isValidName(name) {
    return !(/[^a-zA-Z\s]/.test(name))
}

//Checks if inputed date is older than 117 years
function isDateLower(date) {
    return new Date().getFullYear() - new Date(date).getFullYear() < 117
}

//Checks if inputed date is higher than current date
function isDateHigher(date) {
    return new Date(date) < new Date()
}
 function hourValidator(date) {
     const hours = new Date(date).getHours()
     return hours >= 0 || hours <= 23
 }

UserModel = mongoose.model("user", userSchema)

module.exports = UserModel