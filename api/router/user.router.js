var express = require('express')

var router = express.Router()

const user = require('../controller/user.controller')

router.get('/', user.listUser)

router.post('/', user.addUser)

router.post('/facebook', user.facebook)

module.exports = router