const mongoose = require('mongoose');

const busFacultySchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    busBranch: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: true,
        default: ''
    },
}, { collection: 'bus_faculties' })

mongoose.model('bus_faculties', busFacultySchema);

module.exports = mongoose.model('bus_faculties')