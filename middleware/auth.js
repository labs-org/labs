const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
 
    const token = req.header("x-auth-token");
    if (!token)
      return res
        .status(401)
        .json({ msg: "No authentication token, authorization denied." });
        try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified){
      return res
        .status(401)
        .json({ msg: "Token verification failed, authorization denied." });
    }
    req.user = verified;
    next();
  } catch (err) {
    res.status(500).json({ msg:err});
  }
};

module.exports = auth;
