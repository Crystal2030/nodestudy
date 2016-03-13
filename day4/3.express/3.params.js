var express = require('express');
var app = express();


app.get('/p',function(req,res){
    console.log(req.host);
    console.log(req.path);
    console.log(req.query);
    res.send('Welcome to home page');
});

//路径参数：把向服务器端传递的参数放在路径里
app.get('/user/:id/:age',function(req,res){
    console.log(req.params.id);
    console.log(req.params.age);
    res.send('Welcome to user');
});


app.listen(8080);