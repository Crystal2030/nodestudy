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

    if(pathname == '/'){
        pathname = '/list.html';
    }

    if(pathname == '/favicon.ico'){
        response.end('404');
    }

    if(pathname == '/'){
        response.writeHead(200, {'Content-Type':'text/html;charset=utf-8'});
        fs.readFile('./list.html', function(err, data){
            response.end(data);
        })
    }else if(pathname == '/list') {
        fs.readFile('./user.json', function (err, data){
            if(!err){
                response.end('{"status":"success", "value":' + data.toString() + '}');
            }else{
                response.end('Query failed!')
            }
        });

    }else if(pathname == '/add'){
        //每当服务器收到客户端发过来的一段数据的时候就会触发data事件
        var str = '';
        request.on('data', function(data){
            str += data.toString();
        });

        request.on('end', function(){
            fs.readFile('./user.json', function(err,data){
                console.log('111',str.toString());
                users.push(JSON.parse(str.toString()));
                response.end('{"status":"success", "value":' + str + '}');

                fs.writeFile('./user.json',JSON.stringify(users),[{encoding:'utf-8'},{flag:'a'}], function(err){
                    if(err){
                        response.end('{"status":"error"}');
                    }else{
                        response.end('{"status":"success"}');
                    }
                })
            })
        });
    }else if(pathname == '/edit'){

    }else if(pathname == '/remove'){
        var id = '';
        request.on('data', function(data){
            id = data.toString();
        });

        request.on('end', function(){
            fs.readFile('./user.json', function(err, data){
                if(!err){
                    console.log('222',id.toString());
                    //users.push(JSON.parse(str.toString()));
                    response.end('{"status":"success", "value":' + str + '}');
                }
            })
        })
    }else{
        fs.exists('.'+pathname, function(exists){
            if(exists){
                fs.readFile('.'+pathname,function(err,data){
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
    }



});

server.listen(3000, 'localhost');
