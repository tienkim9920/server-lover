require("dotenv").config();
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

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

app.use(cors());

app.use('/', express.static('public'))
app.use(upload());

var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const userAPI = require('./api/router/user.router')
const matchesAPI = require('./api/router/matches.router')
const chatAPI = require('./api/router/chat.router')

app.use('/user', userAPI)
app.use('/matches', matchesAPI)
app.use('/chat', chatAPI)

io.on('connection', (socket) => {
    console.log('a user connected', socket.id);

    // Server sẽ nhận room chat từ client gửi lên
    // sau đó sẽ tiến hành tạo room chat
    socket.on('room', data => {
        socket.join(data)
        console.log(data)
    })

    // Sau đó sẽ tiến hình quá trình nhận tin nhắn từ client gửi lên
    // có kèm room chat và gửi ngược trở lại
    // những đối tượng tham gia vào room chat không bao gồm người gửi
    socket.on("send", (data) => {
        socket.to(data.room).emit('receive', {
            name: data.msg,
            room: data.room
        })
    })

    socket.on("typing", (data) => {
        socket.to(data.room).emit('typing')
    })
});
  
server.listen(PORT, () => {
    console.log('listening on *: ' + PORT);
});