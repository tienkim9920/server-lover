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

module.exports.getObject = async (req, res) => {

    const _id = req.query._id

    const user = await User.findOne({ _id })

    // Get all list user to match
    const matches = await Matches.find({ id_user: _id, status: '0'}).populate('id_userTo')

    if (matches.length < 20){

        const filterMatches = matches.filter(value => {
            return value.id_userTo.gender !== user.gender
        })

        res.json(filterMatches)
        
    }else{
        const newMatches = matches.slice(0, 20)

        res.json(newMatches)
    }

}