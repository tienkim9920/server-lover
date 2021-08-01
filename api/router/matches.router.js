var express = require('express')

var router = express.Router()

const matches = require('../controller/matches.controller')

router.get('/list', matches.getObject)

// Create these user to all can match with lover
router.post('/', matches.createObject)

module.exports = router