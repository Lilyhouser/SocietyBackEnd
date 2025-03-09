const User = require('../model/User');
const bcrypt = require('bcrypt');

const handleSignup = async (req, res) =>{
    const {username, password} = req.body;

    if(!username || !password) {
        return res.status(401).json({
            message: "Username and password are required!"
        });
    }
    const duplicate = await User.findOne({username}).exec();
    if(duplicate) {
        return res.status(409).json({message: "Username has existed!"});
    }

    try {
        const hashPass = await bcrypt.hash(password, 10);

        await User.create({
            username: username,
            password: hashPass
        });

        return res.status(201).json({message: `Welcome ${username}`});
    } catch (error) {
        res.sendStatus(500);
    }
}

module.exports = {handleSignup}