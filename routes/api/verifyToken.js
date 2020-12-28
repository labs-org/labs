const jwt =require('jsonwebtoken');


const requireAuth =(req, res,next) => {
    const token = req.header('User-token');
if (token){
jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken)=> {
    if(err){
    res.redirect('/login');
    } else {
    console.log(decodedToken)
        next();
    }
   
})
}
else{
    res.redirect('/login');
}


 }

 module.exports = requireAuth