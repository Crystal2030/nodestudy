//fs: file system
//加载FS核心模块， NODE自带的模块
var fs = require('fs');
fs.readFile('./index.txt');

//文件模块： 自己写的文件模块
require('./math.js');

//第三方模块：别人写的,需要先用npm安装
var mime = require('mime');
console.log(mime);