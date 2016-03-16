/**
 * Created by crystal on 3/16/16.
 * 功能：
 * 1. 用户注册 注册页面
 * 2. 用户登陆 登录页面
 * 3. 登陆成功之后返回欢迎页 欢迎页
 */
//load express
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var routes = require('./routes/index');

//get config object
var app = new express();

//set template engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//load and parse urlencoded request body's middleware
app.use(bodyParser.urlencoded({extended:false}));
//set the directory public as static files directory
app.use(express.static(path.join(__dirname, 'public')));




app.listen(5000);
