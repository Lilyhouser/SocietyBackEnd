const Message = require('../model/Message');
const { Server } = require('socket.io');
const statusMap = require('../model/Status');

const socket = (server) => {
    console.log('socket');

    const io = new Server(server, {
        cors: {
            origin: ['http://localhost:3000', 'http://localhost:3001'],
            credentials: true
        }
    });

    //middleware to check username
    io.use((socket, next) => {
        const username = socket.handshake.auth.username;
        if(!username){
            return next(new Error('invalid username'));
        }
        socket.username = username;
        next();
    });

    io.on('connection', (socket) => {
        console.log(socket.id, socket.username);

        socket.join(socket.username);
        statusMap.push(socket.username);
        io.emit('actives', statusMap);

        socket.on('chat', async (data) => {
            const { receiver, content, image, time } = data;
            
            const result = await Message.create({
                sender: socket.username, 
                receiver, content, image, time
            });
            // console.log(result);
            
            io.to([receiver, socket.username]).emit('message', {
                sender: socket.username,
                receiver, content, image, time 
            });
        });

        socket.on('update', async (data) => {
            const {id, content } = data;
            const message = await Message.findOneAndUpdate({'_id':id}, {content, updateTime: new Date()});
                        
            io.to([receiver, socket.username]).emit('new', {
                id, updateTime: message.updateTime
            });
        });

        socket.on('disconnect', () => {
            statusMap.splice(statusMap.indexOf(socket.username), 1);
            console.log(`${socket.username} disconnect ${socket.id}`);
            io.emit('actives', statusMap);
        });
    });
}

module.exports = socket;