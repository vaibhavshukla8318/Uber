const socketIo = require('socket.io');
const userModel = require('./models/user.model');
const driverModel = require('./models/driver.model');

let io;

function initializeSocket(server) {
    io = socketIo(server, {
        cors: {
            origin: '*', // Replace '*' with your frontend's origin for security.
            methods: ['GET', 'POST'],
        },
    });

    io.on('connection', (socket) => {
        console.log(`New client connected: ${socket.id}`);

        socket.on('join', async (data) => {
            try {
                const { userId, userType } = data;
                console.log("userId and userType", userId, userType);

                if (!userId || !userType) {
                    console.error('Invalid join data:', data);
                    return;
                }

                console.log('Data from socket:', data);

                if (userType === 'user') {
                    await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
                    console.log(`User ${userId} socketId updated.`);
                } else if (userType === 'driver') {
                    await driverModel.findByIdAndUpdate(userId, { socketId: socket.id });
                    console.log(`Driver ${userId} socketId updated.`);
                } else {
                    console.error('Invalid userType:', userType);
                }
            } catch (error) {
                console.error('Error in join event:', error.message);
            }
        });

        socket.on('update-location-driver', async (data) =>{
            const {userId, location} = data;

            if(!location || !location.lat || !location.lng){
                return socket.emit('error', {message: 'Invalid location'});
            }

            await driverModel.findByIdAndUpdate(userId, {
                location:{
                    lat: location.lat,
                    lng: location.lng
                }
            })
        })

        socket.on('disconnect', () => {
            console.log(`Client disconnected: ${socket.id}`);
        });
    });
}

function sendMessageToSocketId(socketId, messageObject) {
    console.log(`sending message to ${socketId}`, messageObject)
    if (io) {
        io.to(socketId).emit(messageObject.event, messageObject.data);
        // console.log(`Message sent to socketId ${socketId}:`, messageObject);
    } else {
        console.error('Socket.io is not initialized.');
    }
}

module.exports = {
    initializeSocket,
    sendMessageToSocketId,
};
