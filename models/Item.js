const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    labName: {
        type: String,
        minlength: 3,
        required: false,
        unique: true
    },
    location: {
        type: String,
        minlength: 3,
        // required: true,
        unique: true
    },  phone: {
        type: Number,
        minlength: 3,
        required: false,
    },


    testType: {
        type: String,
        required: false,
    },
    price: {
        type: String,
        required: false,
    },
    image: {
        type: String,
        required: false,
        trim: true
    },

    date: {
        type: Date,
        default: Date.now
    },
   
})

module.exports = Item = mongoose.model('item', ItemSchema);