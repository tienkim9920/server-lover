const User = require('../model/user.model')

module.exports.listUser = async (req, res) => {

    const users = await User.find()

    res.json(users)

}

module.exports.addUser = async (req, res) => {

    const user = await User.findOne({ phone: req.body.phone })

    if (user){
        res.json("User existed")
    }
        
    await User.create(req.body)
    res.json("Success")

}

module.exports.facebook = async (req, res) => {

    const user = await User.findOne({ userID: req.body.userID, accessToken: re.body.accessToken })

    if (user){
        res.json("Account exist")
    }

    res.json("Account no exist")

}