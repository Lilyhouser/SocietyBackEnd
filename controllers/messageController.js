const Message = require('../model/Message');

const getMessage = async (req, res) => {
    const { sender, receiver } = req.query;

    const messages = await Message.find({ 
        'sender': {"$in": [sender, receiver]}, 
        'receiver': {"$in": [sender, receiver]} 
    });
    if(!messages) {
        return res.json({message: "Not found"});
    }
    res.json(messages);
}

module.exports = {
    getMessage
}