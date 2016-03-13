var express = require('express');
var path = require('path');
var app = express();

/**
 * 1.动态内容 当前时间
 * 2.静态内容 当前tmpl.html
 * 3.动静结合
 */
app.get('/',function(req,res){

});

//配置模版引擎
app.set('view engine','ejs');
app.set('views',path.resolve('views'));

app.get('/', function(req, res){
    res.render('index.ejs',{title:'HOME'})
});

app.get('/reg', function(req, res){
    res.render('index',{title:'REGISTER'})
});

app.listen(3000);

