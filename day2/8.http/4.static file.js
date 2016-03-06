//导入核心模块http
var http = require('http');
var fs = require('fs');

var server = http.createServer(function(request,response){
    //解析过程中遇到引用的服务器上的资源（额外的 CSS、JS代码，图片、音视频，附件等），再向服务器发送请求
    var url = request.url;
    console.log(url);

    if(url == '/'){
        url = '/index.html';
    }

    if(url == '/index.html'){
        response.setHeader('Content-Type','text/html;charset=utf-8');
        //指定文件的路径，设置编码，得到data就是字符串类型的
        fs.readFile('./index.html','utf8', function(err,data){
            response.write(data);
            response.end('over');
        })
    }else if(url == '/style.css'){
        response.setHeader('Content-Type','text/css;charset=utf-8');
        fs.readFile('./style.css','utf8', function(err,data){
            response.write(data);
            response.end('over');
        })
    }else if(url == '/index.js'){
        response.setHeader('Content-Type','text/javascript;charset=utf-8');
        fs.readFile('./index.js','utf8', function(err,data){
            response.write(data);
            response.end('over');
        })
    }


});
//在8080端口上进行监听，主机名是localhost
server.listen(8080, 'localhost');//省略第二个参数就是默认localhost