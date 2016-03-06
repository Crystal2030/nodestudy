var fs = require('fs');
/**
 * 1.回调函数里面的err，data是由fs.readFile决定的。
 */
//以同步的方式向硬盘的文件里写数据
//fs.writeFileSync('./name.txt', 'hello world！');

/**
 * 异步操作
 * flag:是表示要对此文件做任何类型的操作
 *  w：清空并切入
 *  a：在原有基础上追加
 */
/*fs.writeFile('./name.txt', 'hello world！',{flag:'a'}, function(err){
    if(err){
        console.error(err);
    }else{
        console.log(arguments);
    }
});*/

//相当于在writeFile里面给flag设置为'a'
fs.appendFile('./name.txt','node');

