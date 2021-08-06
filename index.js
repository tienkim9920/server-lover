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
const messageAPI = require('./api/router/message.router');

// Model
const Message = require("./api/model/message.model");
const Chat = require("./api/model/chat.model");

app.use('/user', userAPI)
app.use('/matches', matchesAPI)
app.use('/chat', chatAPI)
app.use('/message', messageAPI)

let client = []

io.on('connection', async (socket) => {
    console.log('a user connected', socket.id);

    // Server sẽ nhận room chat từ client gửi lên
    // sau đó sẽ tiến hành tạo room chat
    socket.on('room', data => {
        socket.join(data)
    })

    setInterval(() => {
        
        const newClient = client.filter(value => {
            return parseInt(value.expiredTime) > parseInt(Date.now())
        })

        client = newClient

    }, 90000)

    socket.on('getOnline', () => {
        socket.emit('getOnline', client)
    })
    
    // Nhận socket login từ client gửi lên
    // Đầu tiên nó sẽ kiểm tra nếu trong bộ nhớ đã có tồn tại userId thì chứng tỏ userId này đã hoạt động
    // Và nó sẽ return k có thêm vào bộ nhớ nữa
    socket.on('login', session => {

        let flag = false

        client.forEach(value => {
            if (value._id.includes(session)){
                flag = true
            }
        })

        if (flag){
            return
        }

        // Khi thêm vào nó sẽ tạo expiredTime vòng đời cho userId
        const data = {
            _id: session,
            expiredTime: Date.now() + 270000
        }

        client.push(data)
    })

    socket.on('check-active', (userId) => {

        // Kiểm tra xem đối phương đã vào phòng hay chưa
        client.forEach(value => {
            if (value._id.includes(userId)){
                socket.emit('check-active')
            }
        })

    })


    socket.on('active', data => {
        socket.in(data.room).emit('active', data)
    })

    // Sau đó sẽ tiến hình quá trình nhận tin nhắn từ client gửi lên
    // có kèm room chat và gửi ngược trở lại
    // những đối tượng tham gia vào room chat không bao gồm người gửi
    socket.on("send", async (data) => {
        console.log(data)

        const message = await Message.create(data)

        socket.to(data.room).emit('receive', message)
    })

    socket.on("typing", (data) => {
        socket.to(data.room).emit('typing', data)
    })
});
  
server.listen(PORT, () => {
    console.log('listening on *: ' + PORT);
});