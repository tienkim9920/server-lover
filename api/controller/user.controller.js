const User = require('../model/user.model')

module.exports.listUser = async (req, res) => {

    const users = await User.find()

    res.json(users)

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

    const user = await User.findOne({ userID: req.body.userID, accessToken: req.body.accessToken })

    if (user){
        res.json("Account exist")
    }else{
        res.json("Account no exist")
    }

}