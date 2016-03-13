var http = require('http');
var fs = require('fs');
var bodyparser = require('./bodyParser');
var proxy = require('./request')

var server = http.createServer(function(req,res){
    if(req.url == '/'){
        fs.createReadStream('./index.html').pipe(res);
    }else if(req.url == '/reg'){
        /**
         * 1.获取请求里的请求体
         * 2.构建一个指向8080的请求，把请求体传递过去
         * 3.得到8080的响应再传回客户端
         */
        bodyparser(req,function(result){
            proxy({
                host:'localhost',
                port:8080,
                path:'/post',
                method:'POST'
            },result,function(response){
                res.end(response);
            })
        })


    }
}).listen(9090);
