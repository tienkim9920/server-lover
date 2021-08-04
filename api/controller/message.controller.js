const Message = require("../model/message.model")

module.exports.getRoom = async (req, res) => {
    
    const room = req.query.room

    const message = await Message.find({ room })

    res.json(message)

}