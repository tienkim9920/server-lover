const Matches = require('../model/matches.model')
const User = require('../model/user.model')

module.exports.createObject = async (req, res) => {

    // find all user
    const users = await User.find()

    // Filter list user no contain req.body
    const filterUser = users.filter(value => {
        return value._id.toString() !== req.body._id.toString()
    })

    // Push list matches of you and all other
    for (let i = 0; i < filterUser.length; i++){
        const meMatches = {
            status: "0",
            id_userTo: filterUser[i]._id,
            id_user: req.body._id
        }

        await Matches.create(meMatches)

        const otherMatches = {
            status: "0",
            id_userTo: req.body._id,
            id_user: filterUser[i]._id
        }

        await Matches.create(otherMatches)
    }

    res.json("Thanh Cong")
    
}