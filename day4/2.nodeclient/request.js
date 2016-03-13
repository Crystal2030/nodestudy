var http = require('http');
var bodyparser = require('./bodyParser');
/**
 *
 * @param options:访问真正服务器的配置对象
 * @param data：请求体的数据
 * @param callback
 */
module.exports = function(options,data,callback){
    //向真正的数据服务器发送请求，res:代表服务器的响应
    var request = http.request(options,function(res){
        //console.log(res.statusCode);//读取响应
        //console.log(res.headers);//读取响应头
        bodyParser(res,function(result){
            callback(result);
        })
    })

    //向服务器发送请求体
    request.end(data);
}