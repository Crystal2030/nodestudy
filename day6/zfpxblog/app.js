var express = require('express');
var path = require('path');
//处理收藏夹图标的
var favicon = require('serve-favicon');
//写日志的
var logger = require('morgan');
//解析cookie的 req.cookie方法用来设置cookie
// req.cookies把请求
var cookieParser = require('cookie-parser');
//解析请求体的
var bodyParser = require('body-parser');
//加载路由：根据请求的路径不同进行不同的处理
var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));//使用日志中间件
//解析JSON类型的请求体，通过请求头中的Content-Type ｛｝
app.use(bodyParser.json());
//解析urlencoded类型的请求体，通过请求头中的Content-Type name=zfpx
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//路由配置
app.use('/', routes);
app.use('/users', users);//这里的/才是一级目录

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace（错误的调用堆栈）
if (app.get('env') === 'development') {
  //错误处理中间件 多了一个err参数
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
