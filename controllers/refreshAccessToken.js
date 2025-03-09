const User = require('../model/User');
const jwt = require('jsonwebtoken');

const handleRefreshAccessToken = async (req, res) => {
    const cookie = req.headers?.cookie;
    console.log(cookie);
    

    try {
        const token = cookie.split('=')[0] === 'jwt' ? cookie.split('=')[1] : '';
        if (token.length > 0) {
            refreshToken = token;
            console.log(refreshToken);
        }

        if (!refreshToken) {
            return res.sendStatus(401);
        }

        const username = req.params;
        const matchUser = await User.findOne(username).exec();

        if (!matchUser) {
            return res.sendStatus(403);
        }

        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            (err, decoded) => {
                if (err || decoded.username !== matchUser.username) {
                    console.log(decoded);

                    return res.sendStatus(403);
                }
                const accessToken = jwt.sign(
                    {
                        username: decoded.username,
                        block: matchUser.block
                    },
                    process.env.ACCESS_TOKEN_SECRET,
                    { expiresIn: '1h' }
                );

                res.json(accessToken);
            }
        )
    } catch (err) {
        console.log(err);

        res.sendStatus(500);
    }
}

module.exports = { handleRefreshAccessToken };