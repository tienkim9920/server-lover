const mongoose = require('mongoose');
const { Schema } = mongoose;

const MatchSchema = new Schema({
    status: String,
    id_userTo: {
        type: String,
        ref: 'User'
    },
    id_user: {
        type: String,
        ref: 'User'
    }
});

const Matches = mongoose.model('Matches', MatchSchema, 'Matches');

module.exports = Matches