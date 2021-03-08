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
        return next({ error_message: "Age can't be larger than current date." })
    } else if(currentDate.getFullYear() - userDate.getFullYear() > 117) {
        return next({ error_message: "User can't be older than 117 years old." })
    }
    next()
})

UserModel = mongoose.model("user", userSchema)

module.exports = UserModel