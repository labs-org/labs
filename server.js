const express = require('express');
const mongoose = require('mongoose');
var cors = require('cors');
const bodyParser = require('body-parser');
require("dotenv").config();


const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


const db = require('./config/keys').mongoURI;

mongoose
    .connect(db, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('mongoDB connected'))
    .catch((err) => console.log(err));

const port = process.env.PORT || 4000;



app.listen(port, () => console.log(`server started on port ${port}`));

// using routes
app.use('/addItems', require('./routes/api/items'));
app.use('/users', require('./routes/api/users'));
