var fs = require('fs');
function copy(src,target){
    //创建可读流
    var rs = fs.createReadStream(src,{
        start:0
    });
    var ws = fs.createWriteStream(target,{
        flags:'a'//a:表示不清空原来的文件，进行追加；w:清空
    });
    rs.on('data',function(data){
        ws.write(data.toString(),'utf8',function(){
        })
    });
    rs.on('end',function(data){
        ws.end();
    })
}
copy('./index.txt','./write.txt');