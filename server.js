const express = require('express');
const app = express();
const connectDB = require('./config/db');


//connect database
connectDB();


//Middleware
app.use(express.json({
    extended: false
}));
// app.use(express.urlencoded());



app.get('/', (req, res) => res.send('API running'))

//define the routes
app.use('/api/users', require('./routes/api/users'))
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/profile', require('./routes/api/profile'))
app.use('/api/posts', require('./routes/api/posts'))
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`server start on port ${PORT}`));