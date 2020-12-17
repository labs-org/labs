const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const {
    check,
    validationResult
} = require('express-validator/check');

//route GET method api/profile/me (passed in the userId we get)
//get the current user profile
//this is a private route for the user
router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({
            //here we will get the user from the profile model which we add reference to the other table
            user: req.user.id
        }).populate('user', ['labName', 'avatar']);
        if (!profile) {
            return res.status(400).json({
                msg: "There is no profile for this user"
            })
        }
        res.json(profile);

    } catch (err) {
        console.error(error.message);
        res.status(500).send("server error")
    }
});

//route POST method api/profile 
//create or update user profile
//this is a private route for the user
// router.post('/', (req, res) => {
// console.log(req.body)
router.post('/', [auth, [

    check(' testType', 'Test Type is require').not().isEmpty(),
    check(' price', 'Price is require').not().isEmpty(),
    check(' location', 'location is require').not().isEmpty(),
    check(' phone', 'Phone number is require').not().isEmpty(),
]], async (req, res) => {
    // console.log('err');
    if (req.body.tripType === 'one-way') {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({
                errors: errors.array()
            });
        }
    } else {

        console.log('location');
        const {
            testType,
            price,
            location,
            phone
        } = req.body;
        const profileFields = {};
        profileFields.user = req.user.id;
        if (testType) profileFields.testType = testType;
        if (price) profileFields.price = price;
        if (location) profileFields.location = location;
        if (phone) profileFields.phone = phone;

        console.log(req.body);
        res.send('hello')
    }
});



module.exports = router;