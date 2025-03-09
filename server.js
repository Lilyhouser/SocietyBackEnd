const express = require('express')
const app = express();
require('dotenv').config();
const http = require('http');
const connectDB = require('./config/connectDB');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const verifyJwt = require('./middleware/verifyJwt');
const cors = require('cors');
const credentials = require('./middleware/credentials');
const corOptions = require('./config/corOptions');
const socket = require('./socket/socket');

const server = http.createServer(app);
socket(server);

app.use(credentials);
app.use(cors(corOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

connectDB();

app.get('/', (req, res) => {
    res.send('Hello lily');
});

app.use('/refresh', require('./routes/refreshTokenRouter'));
app.use('/signup', require('./routes/signupRouter'));
app.use('/login', require('./routes/loginRouter'));
app.use('/logout', require('./routes/logoutRouter'));

app.use(verifyJwt);
app.use('/users', require('./routes/api/userRouter'));
app.use('/messages', require('./routes/api/messageRouter'));

mongoose.connection.once('open', () => {
    console.log('database connected');

    server.listen(3500, () => {
        console.log('server is running on port 3500...');
    });
})