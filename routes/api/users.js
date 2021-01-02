const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");
const User = require("../../models/User");

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

    // validate

    if (!email || !password || !passwordCheck || !labName || !location || !phone )
      return res.status(400).json({
        msg: "Not all fields have been entered."
      });
    if (password.length < 5)
      return res
        .status(400)
        .json({
          msg: "The password needs to be at least 5 characters long."
        });
    if (password !== passwordCheck)
      return res
        .status(400)
        .json({
          msg: "Enter the same password twice for verification."
        });

    const existingUser = await User.findOne({
      labName: labName
    });
    if (existingUser)
      return res
        .status(400)
        .json({
          msg: "An account with this email already exists."
        });

    // if (!labName) labName = email;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

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


router.route("/Personalprofile").get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error :" + err));
});

// router.delete("/Personalprofile", auth, async (req, res) => {
//   try {
//     const deletedUser = await User.findByIdAndDelete(req.user);
//     res.json(deletedUser);
//   } catch (err) {
//     res.status(500).json({
//       error: err.message
//     });
//   }
// });
// router.delete("/:id",auth, (req, res) => {
//   Item.findByIdAndDelete(req.params.id)
//     .then(() => res.json('Item is deleted!'))
//     .catch(err => res.status(400).json("Error: " + err));
// });

router.delete("/:id",auth, (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => res.json("User deleted"))
    .catch((err) => res.status(400).json("Error: " + err));
});

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


router.get("/register", (req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});
/// post to add posts
router.post("/", (req, res) => {
  const newItem = new User({
    labName:req.body.labName,
    location:req.body.location,
    phone:req.body.phone,
    testType:req.body.testType,
    price:req.body.price,
    image:req.body.image,    
  });

  // saving the new item in the data base by .save method 
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






