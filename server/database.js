const mongoose = require('mongoose');
const assert = require('assert');

const db_url = process.env.DB_URL;

mongoose.connect(
    db_url,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    (error, link) => {

        //checking connection error
        assert.equal(error, null, 'Database Connection failed.')

        //if connected successfully
        console.log('Database Connected');
    }
)



