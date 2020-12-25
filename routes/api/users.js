const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../../config/keys');
const {
    check,
    validationResult
} = require('express-validator/check');

//user model
const User = require('../../models/User')


//route POST method api/users to register the user
//this is a public route, no need for token here
router.post('/', [
      
        check('email', 'Email is required').isEmail(),
        // password must be at least 5 chars long
        check('password', 'password should be 5 or more charecters ').isLength({
            min: 5
        }),
        check('labName', 'LabName is required').not().isEmpty(),
        check('location', 'Location is required').not().isEmpty(),
        check('phone', 'phone is required').not().isEmpty(),
        check('officialWebsite', 'Your official Web site is required').isURL(),

    ],
    async (req, res) => {
        console.log(req.body);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }
        const {
            email,
            password,
            labName,
            location,
            phone,
            officialWebsite
        } = req.body;
        try {
            //see if the user exists
            let user = await User.findOne({
                email
            });
            if (user) {
                return res.status(400).json({
                    errors: [{
                        msg: 'User already exists'
                    }]
                });
            }

            user = new User({
                email,
                password,
                labName,
                location,
                phone,
                officialWebsite
            })

            //encrpt password nad hash it
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt)
            //save the user in the database
            await user.save();
            console.log(user)

            //return jwt
            const payload = {
                user: {
                    id: user.id
                }
            };
            jwt.sign(payload, config.get('jwtSecret'), {
                expiresIn: 360000
            }, (err, token) => {
                if (err) throw err;
                res.json({
                    token
                }) //here we send back the token & we can send the id if we want.
            });
            // res.send('user registered');

        } catch (err) {
            console.error(err.message);
            res.status(500).send('server error')
        }



    });


module.exports = router;
