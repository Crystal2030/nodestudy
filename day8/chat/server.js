var express = require('express');
var path = require('path');

var app = express();
app.use(express.static(__dirname));
app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, 'index.html'));
});

//先创建一个HTTP服务器
var server = require('http').createServer(app);
//再创建感觉socket.io服务器
var io = require('socket.io')(server);
var clients = [];
//监听 客户端的连接事件
//socket代表与某个客户端的连接对象
io.on('connection', function(socket){
    //把当前的socket缓存起来
    clients.push(socket);
    //监听message事件
    socket.on('message', function(msg){
        //把客户端发过来的消息广播给所有的客户端
        clients.forEach(function(client){
            client.send(msg);
        })
    });
});
//监听端口
server.listen(80);