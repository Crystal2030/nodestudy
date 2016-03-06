//File System
var fs = require('fs');

/**
 * 回调函数嵌套实现多个异步操作完成之后执行回调。
 * 缺点：
 *  1.需要的时间长：m+n
 *  2.代码可读性非常差
 */
/*
fs.readFile('./name.txt', function(err, name){
    fs.readFile('./age.txt','utf-8', function(err,age){
        console.log(name,age);
    })
})
*/

//计数器
var person = {};
var count = 0;
function show(){
    if(Object.keys(person).length == 2){
        console.log(person);
    }
}

fs.readFile('./name.txt','utf-8', function(err,name){
    person.name = name;
    show();
})

fs.readFile('./age.txt','utf-8', function(err,age){
    person.name = name;
    show();
})