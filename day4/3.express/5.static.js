var express = require('express');
var path = require('path');
var fs = require('fs');

var app = express();
//写一个static中间件
app.use(function(req,res,next){
    //fs.createReadStream((__dirname+'/public'+req.url).pipe(res));
});
//path.resolve('public') == __dirname+'/public'
app.use(express.static(path.resolve('public')));

app.listen(8080);