/**
 * Created by crystal on 3/9/16.
 * 功能：
 * 查询 把后台存放的用户数组查出来放在table里
 * 增加 把用户填写的表单添加到后台
 * 删除
 * 修改
 */
var http = require('http');
var fs= require('fs');
var mime = require('mime');
var path = require('path');
var url = require('url');

var users = [];

var server = http.createServer(function(request,response){
    //把url转成url对象
    var urlObj = url.parse(request.url,true);
    var pathname = urlObj.pathname;

    if(pathname == '/favicon.ico'){
        response.end('404');
    }

    if(pathname == '/'){
        response.writeHead(200, {'Content-Type':'text/html;charset=utf-8'});
        fs.readFile('./list.html', function(err, data){
            response.end(data);
        })
    }else if(pathname == '/list') {
        var str = '';
        request.on('data', function (data) {
            str += data;
        });
        //服务器根据请求体长度判断是否发送完毕
        request.on('end', function () {
            console.log(str);
            //转成对象追加到用户列表里
            users.push(JSON.parse(str));
            response.end(str);
        })

    }

    fs.exists('.'+pathname, function(exists){
        if(exists){
            fs.readFile('.'+pathname,function(err,data){
                console.error(pathname);
                //如果读取文件出错了，则也报404错误
                if(err){
                    response.end();
                }else{
                    response.write(data);
                    response.end();
                }

            })
        }else{
            response.end();
        }
    });



});

server.listen(3000, 'localhost');
