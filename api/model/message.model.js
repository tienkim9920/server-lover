const mongoose = require('mongoose');
const { Schema } = mongoose;

const MessageSchema = new Schema({
    room: String,
    id_user: {
        type: String,
        ref: 'User'
    },
    message: String
});

const Message = mongoose.model('Message', MessageSchema, 'Message');

module.exports = Message