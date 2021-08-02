const Chat = require("../model/Chat.model")

module.exports.getList = async (req, res) => {

    const _id = req.query._id

    const chat = await Chat.find({ id_user: _id }).populate('id_userTo')

    res.json(chat)

}