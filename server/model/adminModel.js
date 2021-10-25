const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
    email: {
        type: String,
        unique: true,
        require: true
    },
    password: {
        type: String,
        require: true
    }
}, { collection: 'admin_info' })

mongoose.model('admin_info', adminSchema);

module.exports = mongoose.model('admin_info')