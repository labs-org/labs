const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const Item = require('../../models/Item');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

//route get the item

router.get("/fetch", async (req, res) => {
  Item.find()
    .then((ItemSchema) => res.json(ItemSchema))
    .catch((err) => res.status(400).json("Error: " + err));
});

//route create the item
router.route('/').post((req, res) => {
  const testType = req.body.testType;
  const price = req.body.price;
  const newItem = new Item({
    testType,
    price
  });

  // saving the new item in the data base by .save method 
  newItem.save()
    .then(() => res.json("POST Added!"))
    .catch(err => res.status(400).json("Error: " + err));
});

// //GET item by ID  becouse i want to delete and update this items  /we will use find by id method and how ? by get the id by (req.params.id)
// router.route("/:id").get((req, res) => {
//   Item.findById(req.params.id)
//   .then(items => res.json(items))
//   .catch(err => res.status(400).json("Error: " + err));
// });

// //DELETE item by ID
// router.route("/:id").delete((req, res) => {
//   Item.findByIdAndDelete(req.params.id)
//   .then(() => res.json('Item is deleted!'))
//   .catch(err => res.status(400).json("Error: " + err));
// });

// //UPDATE item by ID
// router.route("/update/:id", ).post((req, res) => {
//   Item.findById(req.params.id)
//   .then(items => {
//     items.testType = req.body.testType;
//     items.price = req.body.price;
  
//     items.save()
//     .then(() => res.json("Item is updated!"))
//     .catch(err => res.status(400).json('Error: ' + err));
//   })
//     .catch(err => res.status(400).json('Error: ' + err));
// })


module.exports = router;