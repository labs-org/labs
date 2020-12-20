const express = require('express');
const router = express.Router();

const Item = require('../../models/Item');

//route get the item
router.get('/', (req, res) => {
    Item.find().then((items) => res.json(items));
    // console.log(posts)
});

//route create the item
router.post('/', (req, res) => {
    const newItem = new Item({
        testType: req.body.testType,
        price: req.body.price,
    });
    newItem.save().then((item) => res.json(item));
    console.log(req.body)
});

//route delete the item
router.delete('/:id', (req, res) => {
    Item.findById(req.params.id)
        .then((item) => item.remove().then(() => res.json({
            success: true
        })))
        .catch(err => res.status(404).json({
            success: false
        }))
});

//route update
// router.put('/:id', (req, res) => {
  
// })
module.exports = router;