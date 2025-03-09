const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const handleLogin = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(401).json({
            message: 'Username and password are required!'
        });
    }

    const matchUser = await User.findOne({ username }).exec();

    if (!matchUser) {
        return res.status(401).json({
            message: 'Username does not exist!'
        });
    }

    try {
        const compare = await bcrypt.compare(password, matchUser.password);
        if (!compare) {
            return res.status(401).json({ message: 'Password is incorrect!' });
        }

        const refreshToken = jwt.sign(
            {
                username: matchUser.username
            },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );

        const accessToken = jwt.sign(
            {
                username: matchUser.username,
                block: matchUser.block
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1h' }
        );

        res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });

        res.status(200).json({
            accessToken
        });
    } catch (error) {
        res.sendStatus(500);
    }
}

module.exports = handleLogin;