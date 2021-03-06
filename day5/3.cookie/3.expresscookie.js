var express      = require('express');
var cookieParser = require('cookie-parser');

var app = express();
app.use(cookieParser());

app.get('/write', function (req, res) {
    //默认设置
    /*res.cookie('name','zfpx');
    //设置域名:只有再次访问指定域名的时候客户端才会向服务器端发送cookie
    res.cookie('name','zfpx',{
        domain:'*.zfpx.cn'
    });*/
    //指定路径，只有当下次客户端响服务器发送请求时，如果path=reqd1时，才会向服务器发送，否则不发送
    /*res.cookie('name','zfpx',{
        path:'/read1'
    })*/
    //指定有效期
    res.cookie('name','zfpx',{
        expires: new Date(Date.now()+10*1000)
    });
    res.end('OK');
});

app.get('/read', function(req,res){
    console.log(req.cookies);
    res.send(req.cookies);
})
app.listen(8080);