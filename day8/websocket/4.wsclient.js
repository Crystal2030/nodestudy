var WebSocket = require('ws');
//创建一个服务器实例
var ws = new WebSocket('ws://localhost:8080');

//当连接服务器成功之后调用的回调函数
ws.on('open', function(){
    ws.send('你好服务器');
});

//监听服务器发回来的消息
ws.on('message', function(data, flags){
    console.log(data);//服务器回复：你好服务器
    //console.log(flags.buffer.toString());//服务器回复：你好服务器
})
