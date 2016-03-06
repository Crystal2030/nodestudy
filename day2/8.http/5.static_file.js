//导入核心模块http
var http = require('http');
var fs = require('fs');
var mime = require('mime');
var path = require('path');

/*var mime = {
    '.html': 'text/html',
    '.js':'text/javascript',
    '.css':'text/css'
};*/

var server = http.createServer(function(request,response){
    //解析过程中遇到引用的服务器上的资源（额外的 CSS、JS代码，图片、音视频，附件等），再向服务器发送请求
    var url = request.url;

    if(url == '/'){
        url = '/index.html';
    }
    if(url == './favicon.ico'){
        response.end('404');
    }

    //response.setHeader('Content-Type',mime[path.extname(url)]+';charset=utf-8');
    response.setHeader('Content-Type',mime.lookup(url)+';charset=utf-8');//设置响应头

    fs.exists('.'+url, function(exists){
        if(exists){
            fs.readFile('.'+url,function(err,data){
                console.error(url,err,data);
                //如果读取文件出错了，则也报404错误
                if(err){
                    response.statusCode = 404;
                    response.end();
                }else{
                    response.statusCode = 200;
                    response.write(data);
                    response.end();
                }

            })
        }else{
            response.statusCode = 404;
            response.end();
        }
    })



});


//在8080端口上进行监听，主机名是localhost
server.listen(8080, 'localhost');//省略第二个参数就是默认localhost