var express = require('express')

var router = express.Router()

const user = require('../controller/user.controller')

router.get('/', user.listUser)

router.get('/:id', user.detailUser)

router.patch('/fullname', user.updateFullname)

router.patch('/address', user.updateAddress)

router.patch('/about', user.updateAbout)

router.patch('/gender', user.updateGender)

router.patch('/age', user.updateAge)

router.patch('/media', user.updateMedia)

router.patch('/email', user.updateEmail)

router.patch('/password', user.updatePassword)

router.patch('/delMedia', user.deleteMedia)

router.post('/login', user.loginUser)

router.post('/', user.addUser)

router.post('/facebook', user.facebook)

module.exports = router