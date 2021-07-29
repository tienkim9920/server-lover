var express = require('express')

var router = express.Router()

const matches = require('../controller/matches.controller')

router.post('/', matches.createObject)

module.exports = router