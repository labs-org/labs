const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    user: {
        //here we connected the user model with this model
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    // posts: [{
    testType: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    // }],
    location: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: Number,
        required: true,
        unique: true
    },

})



module.exports = Profile = mongoose.model('profile', ProfileSchema);