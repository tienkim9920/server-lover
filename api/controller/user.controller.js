const User = require('../model/user.model')

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

