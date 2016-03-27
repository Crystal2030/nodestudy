var Server = require('ws').Server;
//创建一个服务器实例
var wss = new Server({
    port: 8080
});

//服务器要具备的两个条件
//在特定的ip和端口上监听客户端的请求
//能够根据客户端的请求进行响应

//监听客户端的请求，当有客户端连接来的时候调用回调函数
wss.on('connection', function(ws){
    //监听 客户端发送来的数据
    ws.on('message', function(message){
        console.log('服务器接收到:%s',message);
        //服务器端向客户端发送消息
        ws.send('服务器回复：'+ message);
    });
});

