/**
 * 在下一个事件环中执行此函数
 * 事件环：
 */
//它每次都要比对时间
setTimeout(function(){
    console.log('a');
},0);
//高效直接执行
setImmediate(function(){
    console.log('b');
})
//把这个函数放在当前任务的末尾
process.nextTick(function(){
    console.log('c');
})
console.log('d');
console.log('e');