var express = require('express')

var router = express.Router()

const chat = require('../controller/chat.controller')

router.get('/list', chat.getList)

module.exports = router