const express = require('express');
require('dotenv').config();
const morgan = require('morgan');
const cors = require('cors');
const database = require('./database');

const app = express()
const port = process.env.PORT

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//data fetch routes
app.use('/api/students/data', require('./router/api/students'))
app.use('/api/admin/data', require('./router/api/admin'))
app.use('/api/bus_faculty/data', require('./router/api/busFaculties'))
app.use('/api/bus_info/data', require('./router/api/busInfo'))

//auth routes
app.use('/api/student/auth', require('./router/api/auth/student'))
app.use('/api/admin/auth', require('./router/api/auth/admin'))
app.use('/api/bus_faculty/auth', require('./router/api/auth/busFaculties'))




app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})