const express = require('express');
const http = require('http');

const app = express();
const PORT = process.env.PORT || 3001;

app.set('view engine', 'ejs');
app.use(express.static('./public'));
app.set('views', './views');

const server = require('http').Server(app);
const io = require('socket.io')(server);

io.on('connection', (socket) => {
    console.log('connect success on ', socket.id);

    socket.on('disconnect', () => {
        console.log(socket.id ,'disconnect');
    })

    socket.on('Client-send-color', (data) => {
        console.log(data);
        io.sockets.emit('Server-send-color', data);
    })
})

app.get('/', (req, res) => {
    res.render('home');
})


server.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});