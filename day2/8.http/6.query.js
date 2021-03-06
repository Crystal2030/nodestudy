//导入核心模块http
var http = require('http');
/**
 * 1. 能在特定的IP 特定端口上监听 客户端的请求
 * 2. 当请求到来的时候能执行监听函数，并返回响应
 *
 * 创建一个服务器
 * 指定监听函数 每当有客户端请求到来的时候执行的函数
 * request 代表客户端的请求，可以从中获取请求过来的信息
 * response 代表向客户端发的响应，可以通过它向客户端发响应
 *
 */

var fs= require('fs');
var mime = require('mime');
var path = require('path');
var url = require('url');//解析url的原生node

var server = http.createServer(function(request,response){
    //把url转成url对象
    var urlObj = url.parse(request.url,true);
    response.writeHead('200', {'Content-Type': 'text/html;charset=utf-8'});
    console.log(urlObj);

    //http://localhost:8080/apple?num=1
    //pathname ：路径名，即问号和端口号中间的那一部分
    if(urlObj.pathname == '/apple'){
        //query 查询字符串，true，转成对象
        response.end(urlObj.query.num+' apples');
    }
});

server.listen('8080', 'localhost');