const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const {
    check,
    validationResult
} = require('express-validator/check');


const User = require('../../models/User')


//route GET method api/auth
//this is a public route, no need for token here
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);

    } catch (err) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

//route POST method api/auth to authenticate the user and get the token
//this is a public route not private

router.post('/', [

        check('email', 'Email is required').isEmail(),
        // password must be at least 5 chars long
        check('password', 'password is required').exists({
            min: 5
        }),

    ],
    async (req, res) => {
        // console.log(req.body);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }
        const {
            email,
            password,

        } = req.body;
        try {
            //see if the user exists
            let user = await User.findOne({
                email
            });
            if (!user) {
                return res.status(400).json({
                    errors: [{
                        msg: 'Invalide User'
                    }]
                });
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({
                    errors: [{
                        msg: 'Invalide User'
                    }]
                });
            }




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