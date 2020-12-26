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
const User = require('../../models/User');


router.get('/User', async (req, res) => {
    User.find()
  .then(UserSchema => res.json(UserSchema))
  .catch(err => res.status(400).json('Error: ' + err));

});

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

















// const router = require('express').Router();
// const AddUser = require('../../models/User')
// const bcrypt = require('bcryptjs');
// const jwt =require('jsonwebtoken');



// // retreve all the data from mongo db
// router.route('/').get((req, res) => {
//       AddUser.find()
//     .then(users => res.json(users))
//     .catch(err => res.status(400).json('Error: ' + err));
  
//   });

//   router.route('/adduser').post(async (req, res) => {
    
//   //checking if the number already signed up
 
//   const numberadded = await AddUser.findOne({phone: req.body.phone})
//   if (numberadded) return res.status(401).send("there is an account with this number,do you want to log in?");

//     //checking if the username is used
       
//   const useradded = await AddUser.findOne({labname: req.body.labname})
//   if (useradded) return res.status(402).send("there is an account with this labname,please choose another one?");
//   const labname = req.body.labname;

//   //hashing password

//   const salt = await bcrypt.genSalt(10)
//    const hashedPassword =  await bcrypt.hash(req.body.password, salt)
//   const email = req.body.email;
//    const phone = req.body.phone;
//   const location = req.body.location;
//   const officialWebSite= req.body.officialWebSite;
// //every thing is ready here we send the data to the server  
   


// const newUser = new AddUser({email:email,password:hashedPassword,labName:labName, phone: phone, location:location, officialWebSite:officialWebSite});
//    try{
//    const saveUser= await newUser.save()
//       res.send({saveUser:newUser._id})
//      // const token = jwt.sign({_id: newUser._id}, process.env.JWT_SECRET )
//     //   console.log(token)
//     //localStorage.setItem('token', token)
//      //res.header('addUser-token',token).send(token);
//      //res.json({ token: token})
//      console.log(token)
//    }catch(err){
//      res.status(400).send(err)
//    }
  
 
//     });

//     ///loggin
//     router.route('/login').post(async (req, res) => {

//     //checking if the username is signed up 

//       const user = await AddUser.findOne({username: req.body.username})
//       if (!user) {return res.status(400).send("there is no account with this username,please check your username?")};

//     //checking if password is correct

//       const validpassword = await bcrypt.compare(req.body.password, user.password)
//       if (!validpassword) return res.status(400).send('Password not correct');

//     //creat and send a token
    
//       const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET );
//      res.send({token :token,user:user});
  
//      //console.log(res.header)
//        });
  





// //GET users by ID  becouse i want to delete and update this user / we will use find by id method and how ? by get the id by (req.params.id)
// router.route("/:id").get((req, res) => {
//   AddUser.findById(req.params.id)
//   .then(users => res.json(users))
//   .catch(err => res.status(400).json("Error: " + err));
// });

// //DELETE user by ID
// router.route("/:id").delete((req, res) => {
//   AddUser.findByIdAndDelete(req.params.id)
//   .then(() => res.json('User is deleted!'))
//   .catch(err => res.status(400).json("Error: " + err));
// })

// //UPDATE user by ID
// router.route("/update/:id", ).post((req, res) => {
//   AddUser.findById(req.params.id)
//   .then(users => {
//     users.email = req.body.email;
//     users.password= req.body.password;
//     users.labName= req.body.labName;
//     users.location= req.body.location;
//     users.phone = req.body.phone;
//     users.officialWebSite= req.body.officialWebSite;
    
//     users.save()
//     .then(() => res.json("Users is updated!"))
//     .catch(err => res.status(400).json('Error: ' + err));
//   })
//     .catch(err => res.status(400).json('Error: ' + err));
// })


//     module.exports= router;