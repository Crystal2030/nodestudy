var http = require('http');
var fs = require('fs');
var bodyparser = require('./bodyParser');
var users = [];
var server = http.createServer(function (req, res) {
    bodyparser(req, function(result){
        users.push(JSON.parse(result));
        res.end(JSON.stringify(users));
    })
}).listen(6060);

