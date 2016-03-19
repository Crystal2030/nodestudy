var express = require('express');
var app = express();
app.use(require('cookie-parser')());
var session = {};
app.get('/', function(req, res){
    console.log(req.headers)
    var sid= req.cookies.sid;
    if(sid){
        //从服务器的session对象中取出当前客户端在服务器对应的session
        var currentSession = session[sid];
        currentSession.mny = currentSession.mny - 10;
        res.send(''+currentSession.mny);
    }else{
        //生成新的sid
        var newSid = Date.now() +''+ Math.random();
        session[newSid] = {mny: 100};
        //写入到客户端
        res.setHeader('Set-Cookie','connect.sid='+newSid);
        res.send('新朋友');
    }
})

app.listen(80);