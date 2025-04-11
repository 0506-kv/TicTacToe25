const socketIo = require('socket.io');
const userModel = require('./models/user.model');

let io;

function initializeSocket(server) {
    io = socketIo(server, {
        cors: {
            origin: 'http://localhost:5173', // Your frontend URL
            methods: ['GET', 'POST'],
            credentials: true
        }
    });

    io.on('connection', (socket) => {
        console.log('New client connected', socket.id);

        socket.on('join', async (data) => {
            const { userId, userType } = data;

            console.log('User joined', userId, userType);

            if (userType === 'user') {
                await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
            }
        });


        socket.on('disconnect', () => {
            console.log('Client disconnected', socket.id);
        });
    });
}

function sendMessageToSocketId(socketId, messageObj) {
    console.log('Sending message to socket:', socketId, messageObj);
    if (io) {
        io.to(socketId).emit(messageObj.event, messageObj.data);
    } else {
        console.error('Socket.io not initialized');
    }
}

module.exports = {
    initializeSocket,
    sendMessageToSocketId
};