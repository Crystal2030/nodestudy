//File System
var fs = require('fs');
function afterRead(err, data){
    if(err){
        console.error(err);
    }else{
        console.log(data.toString());
    }
}
/**
 * 1.异步方法需要把回调函数传入
 * 2.回调函数会在同步方法执行完后执行异步回调
 * 3.异步方法不能阻塞主线程，不会影响后续代码的执行
 */
fs.readFile('./index.html','utf8', afterRead);
console.log('b');
console.log('c');