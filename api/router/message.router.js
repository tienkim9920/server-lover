var express = require('express')

var router = express.Router()

const message = require('../controller/message.controller')

// Get these message of there room
router.get('/room', message.getRoom)

module.exports = router