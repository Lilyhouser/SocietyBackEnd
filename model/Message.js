const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    sender: {
        type: String,
        require
    },
    receiver: {
        type: String,
        require
    },
    content: {
        type: String,
        require
    },
    image: {
        type: String
    },
    time: {
        type: Date,
        require
    },
    updateTime: {
        type: Date
    }
});

module.exports = mongoose.model('Message', MessageSchema);