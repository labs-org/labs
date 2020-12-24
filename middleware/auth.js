const jwt = require('jsonwebtoken');
const config = require('../config/keys');



module.exports = function (req, res, next) {
  //get the token from the header
  const token = req.header('x-auth-token');
  // check if no token 
  if (!token) {
    //if the route is protected we will git this msg
    return res.status(401).json({
      msg: 'authorization denied'
    });
  }
  // verify the token
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({
      msg: 'token not valid'
    })

  }


}