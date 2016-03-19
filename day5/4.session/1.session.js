var express = require('express');
var session = require('express-session');
var app = express();

/**
 * 原理
 */
sessions = {};

app.use(session({
    secret: 'zfpx', //secret的值建议使用随机字符串
    cookie: {maxAge: 60 * 1000 * 30}, // 过期时间（毫秒）
    resave:true,//每次响应结束的时候都重新保存我们的session
    saveUninitialized:true//保存未初始化的session
}));
app.get('/', function (req, res) {
    if (req.session.sign) {//检查用户是否已经登录
        console.log(req.session);//打印session的值
        res.send('welcome <strong>' + req.session.name + '</strong>, 欢迎你再次登录');
    } else {
        //第一次访问的时候，会生成一个sid（比较复杂）
        //sessions.sid={}
        //把这个sid发送到浏览器端
        //因为session是借用cookie实现的，所以当设置session的时候，会自动设置cookie
        req.session.sign = true;
        req.session.name = '珠峰培训';
        res.send('欢迎登陆！');
    }
});
app.listen(80);