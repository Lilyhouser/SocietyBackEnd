const User = require('../model/User');
const jwt = require('jsonwebtoken');

const getAllUser = async (req, res) => {
    const users = await User.find();

    if (users?.length < 1) {
        return res.json({ success: "No user to display" });
    }

    const result = users.map(user => {
        const resultUser = {
            id: user._id,
            username: user.username,
            block: user.block,
            active: user.active
        }
        return resultUser;
    });

    res.json(result);
}

const getUser = async (req, res) => {
    const { id } = req.params;

    const user = await User.findOne({ _id: id });

    if (!user) {
        return res.status(404).json({ message: 'Not found' });
    }

    const result = {
        id: user._id,
        username: user.username,
        block: user.block,
        active: user.active
    };

    res.json(result);
}

module.exports = {
    getAllUser,
    getUser
}