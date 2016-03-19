var http = require('http');

http.createServer(function(req, res){
    if(req.url == '/write'){
        //响应头 实体头 扩展头自定义头
        var time = new Date(new Date().getTime() + 60*1000).toGMTString();
        //response.setHeader('Set-Cookie','name2=zfpx2; path=/; Expires='+timeObj+'');
        //缺点：使用response.writeHead只能发送一次头部，即只能调用一次，且不能与response.render共存，否则会报错。
        res.writeHead(200,{
            'Set-Cookie':'age=6; path=/; Expires='+time
        });
        res.end('OK');
    }else if(req.url == '/read'){
        console.log(req.headers);
        res.end(req.headers.cookie);
    }
}).listen(8080);