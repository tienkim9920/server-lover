var express = require('express')

var router = express.Router()

const matches = require('../controller/matches.controller')

// Get all matches
router.get('/list', matches.getObject)

// Create these user to all can match with lover
router.post('/', matches.createObject)

router.patch('/like', matches.updateLike)

router.patch('/unlike', matches.updateUnlike)

router.patch('/supper', matches.updateSupper)

module.exports = router