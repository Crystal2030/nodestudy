var fs = require('fs');
function copy(src,target){
    var rs = fs.createReadStream(src);
    var ws = fs.createWriteStream(target);
    //对文件写和读的时候
    //要先打开文件，然后读写文件，然后关闭文件
    //end:true表示数据读取完毕后立刻将缓存区的数据写入目标文件完毕后关闭文件
    rs.pipe(ws,{end:true});
    ws.write('over');
}
//Pipe源码
function pipe(source, dest){
    source.on('data',ondata);
    function ondata(chunk){
        //些成功就是true，写失败就是false
        if(false === dest.write(chunk)){
            //停止触发data事件
            source.pause();
        }
    }
    //当全部咽下后，调用回调函数
    dest.on('drain', function(){
       //重新触发data事件
        source.resume();
    });

}
copy('./index.txt', './write.txt');