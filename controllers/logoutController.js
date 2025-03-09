const User = require('../model/User');

const handleLogout = async (req, res) => {
    const cookies = req.headers?.cookie;

    let refreshToken;
    cookies.split(';').forEach(cookie => {
        const token = cookie.split('=')[0] === 'jwt' ? cookie.split('=')[1] : '';
        if (token.length > 0) {
            refreshToken = token;
        }
    });

    if (!refreshToken) {
        return res.sendStatus(204);
    }

    const username = req.params;
    const matchUser = await User.findOne({ username }).exec();

    if (!matchUser) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None' });
        return res.sendStatus(204);
    }

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None' });
    res.sendStatus(204);

}

module.exports = handleLogout;