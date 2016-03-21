var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var flash = require('connect-flash');//The flash is a special area of the session used for storing messages

var routes = require('./routes/index');
var users = require('./routes/users');
var articles = require('./routes/articles');
var settings = require('./settings');

var app = express();

//设置模板文件的存放路径
app.set('views', path.join(__dirname, 'views'));
// 设置模板引擎np
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
//解析urlencoded类型的请求请求 通过请求中的Content-Type name=zfpx
app.use(bodyParser.json());
//解析JSON类型的请求请求 通过请求中的Content-Type {}
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//静态文件服务中间件 指定静态文件根目录
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/articles', articles);

app.use(session({
  secret: settings.cookieSecret,//secret 用来防止篡改 cookie
  key: settings.db,//key 的值为 cookie 的名字
  cookie: {maxAge: 1000*60*60*24*30},
  resave: true,
  saveUninitialized: true,
  Store: new MongoStore({
    url: settings.url
  })
}));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// 开发环境的错误处理 ，将打印出错误的调用堆栈
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// 生产环境中的错误处理
// 不把堆栈信息暴露给用户
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
