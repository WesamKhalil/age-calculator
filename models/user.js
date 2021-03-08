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

userSchema.pre("save", function(next) {
    const currentDate = new Date()
    const userDate = new Date(this.date)

    if(userDate > currentDate) {
        throw Error("Age can't be higher than current date.")
    } else if(currentDate.getFullYear() - userDate.getFullYear() > 117) {
        throw Error("User can't be older than 117 years old.")
    }
    next()
})

UserModel = mongoose.model("user", userSchema)

module.exports = UserModel