require("dotenv").config();
const express = require("express");

const app = express();
const PORT = process.env.PORT || 4000;

const cors = require("cors");
var upload = require('express-fileupload');

const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://tienkim9920:U4tQMg6Wfy8DaL@cluster0.tessf.mongodb.net/Lover?retryWrites=true&w=majority", {
    useFindAndModify: false,
    useCreateIndex: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

app.use('/', express.static('public'))
app.use(upload());

var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

const userAPI = require('./api/router/user.router')
const matchesAPI = require('./api/router/matches.router')
const chatAPI = require('./api/router/chat.router')

app.use('/user', userAPI)
app.use('/matches', matchesAPI)
app.use('/chat', chatAPI)

app.listen(PORT, () => {
    console.log(`listening at http://localhost:${PORT}`);
});