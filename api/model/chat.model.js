const mongoose = require('mongoose');
const { Schema } = mongoose;

const ChatSchema = new Schema({
    id_user: String,
    id_userTo: {
        type: String,
        ref: 'User'
    },
    room: String
});

const Chat = mongoose.model('Chat', ChatSchema, 'Chat');

module.exports = Chat