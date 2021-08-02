const User = require('../model/user.model')
const fs = require('fs')

module.exports.listUser = async (req, res) => {

    const users = await User.find()

    res.json(users)

}

module.exports.detailUser = async (req, res) => {

    const id = req.params.id
    
    const user = await User.findOne({ _id: id })

    res.json(user)

}

module.exports.addUser = async (req, res) => {

    const user = await User.findOne({ phone: req.body.phone })

    if (user){
        res.json("User existed")
    }else{
        const newUser = await User.create(req.body)
        res.json(newUser)
    }

}

module.exports.facebook = async (req, res) => {

    const user = await User.findOne({ userID: req.body.userID })

    if (user){
        res.json({
            msg: "Account exist",
            userID: user._id
        })
    }else{
        res.json({
            msg: "Account no exist"
        })
    }

}

module.exports.loginUser = async (req, res) => {
    
    const user = await User.findOne({ phone: req.body.phone })

    if (!user){
        res.json("Please Checking Phone Again!")
    }else{
        if (user.password.toString() !== req.body.password.toString()){
            res.json("Please Checking Password Again!")
        }else{
            res.json(user)
        }
    }

}

module.exports.updateFullname = async (req, res) => {

    const user = await User.findOne({ _id: req.body._id })

    user.fullname = req.body.fullname

    user.save()

    res.json("Update Fullname Success")

}

module.exports.updateAddress = async (req, res) => {

    const user = await User.findOne({ _id: req.body._id })

    user.address = req.body.address

    user.save()

    res.json("Update Address Success")

}

module.exports.updateAbout = async (req, res) => {

    const user = await User.findOne({ _id: req.body._id })

    user.bio = req.body.bio

    user.save()

    res.json("Update About Success")

}

module.exports.updateGender = async (req, res) => {

    const user = await User.findOne({ _id: req.body._id })

    user.gender = req.body.gender

    user.save()

    res.json("Update Gender Success")

}

module.exports.updateAge = async (req, res) => {

    const user = await User.findOne({ _id: req.body._id })

    user.age = req.body.age

    user.save()

    res.json("Update Age Success")

}

module.exports.updateEmail = async (req, res) => {

    const user = await User.findOne({ _id: req.body._id })

    user.email = req.body.email

    user.save()

    res.json("Update Email Success")

}

module.exports.updatePassword = async (req, res) => {

    const user = await User.findOne({ _id: req.body._id })

    user.password = req.body.password

    user.save()

    res.json("Update Password Success")

}

module.exports.updateMedia = async (req, res) => {

    const user = await User.findOne({ _id: req.body._id })

    if (user.image.length < 9){
        var fileImage = req.files.file;

        var fileName = fileImage.name

        // create path to client get image
        var fileProduct = "https://server-lover.herokuapp.com/" + fileName
        // var fileProduct = "http://localhost:4000/" + fileName

        const image = {
            id: Math.random().toString(),
            url: fileProduct
        }

        user.image.push(image)

        // move file name in folder public
        fileImage.mv('./public/' + fileName)

        user.save()

        res.json({ msg: "Success" })
    }else{
        res.json({ msg: "Fail" })
    }

}

module.exports.deleteMedia = async (req, res) => {

    // get a user
    const user = await User.findOne({ _id: req.body._id })

    // get path of user
    const path = user.image[req.body.position].url

    // split path become string 
    const newPath = path.replace('https://server-lover.herokuapp.com/', './public/')
    // const newPath = path.replace('http://localhost:4000/', './public/')

    // delete file path
    fs.unlink(newPath, (err) => {
        if (err) {
          console.error(err)
          return
        }
    })

    // delete position image user
    user.image.splice(req.body.position, 1)

    user.save()

    res.json(user)

}

