var express = require('express');
var cookieParser = require('cookie-parser');
var path = require('path');
var app = express();

//配置模版引擎
app.set('view engine','ejs');
app.set('views',path.resolve());

app.use(cookieParser());

function checkLogin(req, res, next){
    if(req.cookies && req.cookies.username){
        next();
    }else{
        res.redirect('/');
    }
}

//进入登录页
app.get('/', function(req,res){
    res.render('login',{});
})
//登录
app.get('/login', function(req,res){
    var username = req.query.username;
    res.cookie('username', username);
    res.redirect('/user');
});

//用户主页
app.get('/user', checkLogin, function(req,res){
    res.send(req.cookies.username);
});

app.listen(8080);