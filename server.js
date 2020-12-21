const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const db = require('./config/keys').mongoURI;

mongoose
    .connect(db, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('mongoDB connected'))
    .catch((err) => console.log(err));

const port = 3000;



app.listen(port, () => console.log(`server started on port ${port}`));

// using routes
app.use('/', require('./routes/api/items'));