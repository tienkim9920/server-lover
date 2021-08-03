var express = require('express')

var router = express.Router()

const chat = require('../controller/chat.controller')

router.get('/list', chat.getList)

router.get('/user', chat.getUser)

router.get('/room', chat.getRoom)

module.exports = router