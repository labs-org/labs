const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({

    testType: {
        type: String,
        // required: true,
    },
    price: {
        type: String,
        // required: true,
    },
    date: {
        type: Date,
        default: Date.now
    }

})

module.exports = Item = mongoose.model('item', ItemSchema);