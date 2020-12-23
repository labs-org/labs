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


module.exports = router;