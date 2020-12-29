const express = require('express');
const mongoose = require('mongoose');
var cors = require('cors');
const bodyParser = require('body-parser');
require("dotenv").config();
const path = require('path'); 


const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// app.use(express.static(path.join(__dirname, 'public')))
// app.get('*', (req,res) => res.sendFile(path.join(__dirname, '/')))
const db = require('./config/keys').mongoURI;

mongoose
    .connect(db, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('mongoDB connected'))
    .catch((err) => console.log(err));

const port = process.env.PORT || 3000;



app.listen(port, () => console.log(`server started on port ${port}`));

// using routes
app.use('/addItems', require('./routes/api/items'));
app.use('/users', require('./routes/api/users'));