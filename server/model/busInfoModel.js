const mongoose = require('mongoose');

const busInfoSchema = mongoose.Schema({
    name: {
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
    vacantSeats: {
        type: Number,
        require: true,
    },
    totalSeats: {
        type: Number,
        require: true
    }
}, { collection: "bus_info" })

mongoose.model('bus_info', busInfoSchema);

module.exports = mongoose.model('bus_info');