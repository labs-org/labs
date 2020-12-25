const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');


const User = require('../../models/User')


//route GET method api/auth
//this is a public route, no need for token here
router.get('/', auth, async (req, res) => {
    try {
        const user =  await User.findById(req.user.id).select('-password');
        res.json(user);

    } catch (err) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});


module.exports = router;