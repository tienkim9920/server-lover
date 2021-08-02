const Chat = require('../model/Chat.model')
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

    const filterMatches = matches.filter(value => {
        return value.id_userTo.gender !== user.gender
    })

    if (filterMatches.length < 20){

        res.json(filterMatches)
        
    }else{
        const newMatches = filterMatches.slice(0, 20)

        res.json(newMatches)
    }

}

module.exports.updateLike = async (req, res) => {

    // Get object that user match
    const match = await Matches.findOne({ _id: req.body._id })

    match.status = '1'

    match.save()

    // Check conditional to push room chat for lover
    const checking = await Matches.findOne({ id_user: match.id_userTo, id_userTo: match.id_user })

    if (checking.status === '1' || checking.status === '2'){

        checkingMatch(match)

        res.json("Create Room Chat Success")
    }else{
        res.json("Success")
    }

}

module.exports.updateSupper = async (req, res) => {

    const match = await Matches.findOne({ _id: req.body._id })

    match.status = '2'

    match.save()

    // Check conditional to push room chat for lover
    const checking = await Matches.findOne({ id_user: match.id_userTo, id_userTo: match.id_user })

    if (checking.status === '1' || checking.status === '2'){

        checkingMatch(match)

        res.json("Create Room Chat Success")
    }else{
        res.json("Success")
    }   

}

module.exports.updateUnlike = async (req, res) => {

    const match = await Matches.findOne({ _id: req.body._id })

    match.status = '3'

    match.save()

    res.json("Success")

}



async function checkingMatch(array){
    const room = Math.random().toString()

    const chat_user_me = {
        id_user: array.id_user,
        id_userTo: array.id_userTo,
        room
    }

    // Create room chat for me
    await Chat.create(chat_user_me)

    const chat_user_to = {
        id_user: array.id_userTo,
        id_userTo: array.id_user,
        room
    }

    // Create room chat for there
    await Chat.create(chat_user_to)

}