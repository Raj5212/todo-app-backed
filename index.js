const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const socketio = require('socket.io');

require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// Socket.IO Connection
// io.on('connection', (socket) => {
//     console.log('User connected');

//     socket.on('disconnect', () => {
//         console.log('User disconnected');
//     });

//     socket.on('chat message', (msg) => {
//         const newMessage = new Chat({ message: msg.message, sender: msg.sender });
//         newMessage.save()
//             .then(() => {
//                 io.emit('chat message', msg);
//             })
//             .catch((err) => {
//                 console.error('Error saving message:', err);
//             });
//     });
// });

// Routes
app.get('/', (req, res) => {
    res.json({ "message": "Welcome now u all guys are here" });
});

// Import all routes
require('./src/routes/allRoutes')(app);

// Listen for requests
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});







