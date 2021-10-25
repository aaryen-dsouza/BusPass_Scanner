const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
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
    branch: {
        type: String,
        require: true
    },
    busBranch: {
        type: String,
        require: true
    },
    qrValidTill: {
        type: Date,
        default: Date.now()
    },
    image: {
        type: String,
        require: true,
        default: ''
    },
    qrValid: {
        type: Boolean,
        default: true
    }

})

mongoose.model('students', studentSchema);

module.exports = mongoose.model('students')