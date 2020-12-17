const express = require('express');
const router = express.Router();


//route GET method api/profile
//this is a public route, no need for token here
router.get('/', (req, res) => res.send('profile route'));


module.exports = router;
