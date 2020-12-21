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
router.get('/', (req, res) => {
    Item.find()
        .sort({
            date: -1
        })
        .then((items) => res.json(items));
    // console.log(posts)
});

//route create the item
router.post('/', (req, res) => {
    // console.log(req.body)
    const newItem = new Item({
        testType: req.body.testType,
        price: req.body.price,
    });
    newItem.save().then((item) => res.json(item));

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