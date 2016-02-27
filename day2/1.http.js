var http = require('http');
/**
 *
 * @param req 请求对象 电话的听筒
 * @param res 响应对象 电话的话筒
 */
function serve(req,res){
    console.log(req.method);
    console.log(req.url);
    console.log(req.headers);
    res.writeHead(200,{'Content-Type':'text/plain'})
    res.write('<h1>hello'+new Date().toLocaleString()+'</h1>');//向客户端说话
    res.end();//结束响应，完成请求，挂掉电话
}
//当有连接到来的时候调用serve方法为客户端提供服务
var server = http.createServer(serve);//创建一个服务

//在localhost这个主机上监听8080端口
server.listen(8080,'192.168.1.113');
