var fs = require('fs');

var rs = fs.createReadStream('./index.txt',{
    start:0,
    end:5,
    highWaterMark:2
});
var buffers = [];
rs.on('readable', function(){
    //readable事件一共触发了4次，读完3次后readable还会尝试去读一次检查是否读完
    console.log('=====readable====');
    //rs.read(1);//读1个字节，这个函数是在readble事件触发时回调函数里读取数据
    var buff;
    while(null!=(buff = rs.read(1))){
        buffers.push(buff);
    }
})

rs.on('end',function(){
    var data = Buffer.concat(buffers);
    console.log(data.toString());//123456
})