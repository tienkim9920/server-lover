require("dotenv").config();
const express = require("express");

const app = express();
const PORT = process.env.PORT || 4000;

const cors = require("cors");

const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://tienkim9920:U4tQMg6Wfy8DaL@cluster0.tessf.mongodb.net/Lover?retryWrites=true&w=majority", {
    useFindAndModify: false,
    useCreateIndex: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

const userAPI = require('./api/router/user.router')

app.use('/user', userAPI)

app.listen(PORT, () => {
    console.log(`listening at http://localhost:${PORT}`);
});