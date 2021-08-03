const Chat = require("../model/chat.model")

module.exports.getList = async (req, res) => {

    const _id = req.query._id

    const chat = await Chat.find({ id_user: _id }).populate('id_userTo')

    res.json(chat)

}

module.exports.getRoom = async (req, res) => {

    const _id = req.query._id

    const room = req.query.room

    const chat = await Chat.findOne({ id_user: _id, room }).populate('id_userTo')

    res.json(chat)

}

module.exports.getUser = async (req, res) => {

    const _id = req.query._id

    const userTo = req.query.userTo

    const chat = await Chat.findOne({ id_user: _id, id_userTo: userTo }).populate('id_userTo')

    res.json(chat)

}