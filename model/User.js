const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        require
    },
    password: {
        type: String,
        require
    },
    block: []
});

module.exports = mongoose.model('User', UserSchema);