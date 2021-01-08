const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5
    },
    labName: {
        type: String,
        minlength:3,
        required: true,
        unique: true
    },
   
    location: {
        type: String,
        minlength: 4,
        required: true,
        unique: true
    },
    phone: {
        type: Number,
        minlength: 5,
        required: true,
    },
    description: {
        type: String,
        minlength: 5,
        required: true,
    },
    image: {
        type: String,
        required: false,
        trim: true
    },

    date : {
        type: Date,
        default: Date.now
    }
})


module.exports = User = mongoose.model('user', UserSchema );