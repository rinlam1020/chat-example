// const express = require('express')
// const app = express()
// const port = 2002

// app.get('/', (req, res) => res.send('Hello World!'))

// app.listen(port, () => console.log(`Example app listening on port ${port}!`))
var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  // res.send('<h1>Hello world</h1>');
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  // console.log('a user connected');
  // socket.on('disconnect', function(){
  //   console.log('user disconnected');
  // });
  socket.on('chat message', function(msg){
    //console.log('message: ' + msg);
    io.emit('chat message', socket.id + ':' + msg);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});