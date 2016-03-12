//引入核心模块
var http = require('http');
//引用URL解析URL参数
var url = require('url');
http.createServer(function(req,res){
    var urlObj = url.parse(req.url,true);
    //路径名
    var pathname = urlObj.pathname;
    var query = urlObj.query;
    if(pathname == '/books'){
        res.end(query.callback+'(["'+query.name+'"])');
    }
}).listen('8080');
