var fs = require('fs');
//创建可读流 可读流只关心是否读到数据，以及读到数据如何处理
var rs = fs.createReadStream('./index.txt',{
    start:3,
    end:8,
    highWaterMark:4 // 最高水位线，停止从底层资源读取前内部缓冲区最多能存放的字节数。 缺省为64kb
});
//设置编码
rs.setEncoding('utf8');
//监听data事件，当读到数据的时候会发射data事件
rs.on('data',function(data){
   console.log('Get data: ',data.toString());
});
//从文件中读取完毕之后会触发end事件
rs.on('end',function(){
    console.log('End');
});
//从文件中监听到错误会触发error事件
rs.on('error',function(err){
    console.error(err);
});
/**
 * 判断错误的三种情况：
 * 1.同步方法 try catch
 * 2.异步：判断回调函数里面的error对象是否有值
 * 3.流： 监听它的error事件
 */