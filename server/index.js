const express = require('express');
require('dotenv').config();
const morgan = require('morgan');
const cors = require('cors');
const database = require('./database');

const app = express()
const port = process.env.PORT;

const multiRoute = require('./router/api/multiRoute');
const multiAuth = require('./router/api/multiAuth');

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//types
// ADMIN
// STUDENT
// BUS_FACULTY
// BUS_INFO

//data fetch routes
app.use('/api/data/', multiRoute);



//auth routes
app.use('/api/auth/', multiAuth);



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})