var fs = require('fs');

var ws = fs.createWriteStream('./write.txt',{
    flags:'w',//a:表示不清空原来的文件，进行追加；w:清空
    start:6//开始的写入位置
});
//写入
ws.write('天','utf8',function(){
    console.log(arguments);
})
ws.write('天','utf8',function(){
    console.log(arguments);
})
//写入并且关闭
ws.end('向上','utf8');

