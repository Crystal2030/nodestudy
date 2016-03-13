var express = require('express');
var app = express();
var bodyParser = require('body-parser');

//extended 为true时，用querystring，如果是false会用bodyParser自己的转换方式
//如果请求头里面的content-typeshi :application/x-www-form-urlencoded,会用此中间件转成对象改
//如果请求头里面的content-type是 :application/json,会用此中间件转成对象改

app.use(bodyParser.urlencoded({extended:true}));//此中间件会在请求体提取出来放到req.body
//app.use(bodyParser.json());
app.use(express.static(__dirname));

app.post('/reg', function(req,res){
    console.log(req.body);
    res.end('reg');
});

app.listen(8080);