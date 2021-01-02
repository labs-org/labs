const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");

//bring the model from the models file
const User = require("../../models/User");

// this is post request to register a user
router.post("/register", async (req, res) => {
  try {
    let {
      email,
      password,
      passwordCheck,
      labName,
      location,
      phone,
      testType,
      price
      
    } = req.body;

    // validate the fields

    if (!email || !password || !passwordCheck || !labName || !location || !phone )
      return res.status(400).json({
        msg: "Not all fields have been entered."
      });
      //password should be more than 5 cherecters
    if (password.length < 5)
      return res
        .status(400)
        .json({
          msg: "The password needs to be at least 5 characters long."
        });
        //if the password did not match
    if (password !== passwordCheck)
      return res
        .status(400)
        .json({
          msg: "Enter the same password twice for verification."
        });
// check if the user is exist
    const existingUser = await User.findOne({
      labName: labName
    });
    if (existingUser)
      return res
        .status(400)
        .json({
          msg: "An account with this email already exists."
        });


// her we hash the password
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
// creating a user and save it
    const newUser = new User({
      email,
      password: passwordHash,
      labName,
      location,
      phone,
      testType,
      price
    });
    const savedUser = await newUser.save();
    console.log(savedUser);
    res.json(savedUser);
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
});

// log in
router.post("/login", async (req, res) => {
  try {
    const {
      email,
      password,
      labName
    } = req.body;

    // validate
    if (!email || !password)
      return res.status(400).json({
        msg: "Not all fields have been entered."
      });

    const user = await User.findOne({
      labName: req.body.labName
    });
    console.log('here is the user ', user)
    if (!user)
      return res
        .status(400)
        .json({
          msg: "No account with this LAB name has been registered."
        });
// if the hashed password did not matche
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({
      msg: "Invalid credentials."
    });

    const token = jwt.sign({
      id: user._id
    }, process.env.JWT_SECRET);
    res.json({
      token: token,
      labName: user.labName,
      user: {
        id: user._id,
       
      },
    });
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
});
router.get("/login", (req, res) => {
  res.send("GET Login");
});

// get request 
router.route("/Personalprofile").get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error :" + err));
});


// delete the user
router.delete("/:id",auth, (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => res.json("User deleted"))
    .catch((err) => res.status(400).json("Error: " + err));
});

// validate the token
router.post("/tokenIsValid", async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.json(false);

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) return res.json(false);

    const user = await User.findById(verified.id);
    if (!user) return res.json(false);

    return res.json(true);
  } catch (err) {
    res.status(500).json({
      msg: err.message
    });
  }
});

// get request from register
router.get("/register", (req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});
/// post to add user
router.post("/", (req, res) => {
  const newItem = new User({
    labName:req.body.labName,
    location:req.body.location,
    phone:req.body.phone,
    testType:req.body.testType,
    price:req.body.price,
    image:req.body.image,    
  });

  // saving the new user in the data base by .save method 
  newItem.save()
    .then((items) => res.json("POST Added!"))
    .catch(err => res.status(400).json("Error: " + err));
});

// UPDATE item by ID
router.patch("/edit/:id",auth, (req, res) => {
  // console.log(req.header)
  User.findByIdAndUpdate(req.params.id,req.body)
    .then(() => res.json("user updated"))
    .catch(err => {console.log(err)
      res.status(400).json('Error: ' + err)});
})

module.exports = router;






