const express = require('express');
const router = express.Router();


//route GET method api/posts
//this is a public route, no need for token here
router.get('/', (req, res) => res.send('posts route'));


module.exports = router;
