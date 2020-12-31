const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({

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
        // required: true,
        trim: true
    },

    date: {
        type: Date,
        default: Date.now
    },
    labName: {
        type: String,
        minlength: 3,
        // required: true,
        unique: true
    },

})

module.exports = Item = mongoose.model('item', ItemSchema);