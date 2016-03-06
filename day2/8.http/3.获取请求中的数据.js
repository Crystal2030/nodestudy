//导入核心模块http
var http = require('http');


var server = http.createServer(function(request,response){
    console.log(request.method);//请求的方法
    console.log(request.url);//请求的URL
    console.log(request.headers);//请求头

    response.statusCode = 404;//设置响应码
    //设置响应头
    response.setHeader('Content-Type','text/html;charset=utf-8')
    //Error: Can't set headers after they are sent.
    //在响应头发出以后不能再发送响应头
    response.write('hello');//写的响应体，在调用第一次write的时候，会发送响应头和第一个write的内容
    setTimeout(function(){
        response.write('world');
        response.end('end');
    }, 2000);

});
//在8080端口上进行监听，主机名是localhost
server.listen(8080, 'localhost');//省略第二个参数就是默认localhost