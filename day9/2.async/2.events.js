var fs = require('fs');
var EventEmitter = require('events');
/**
 * 1.监听一个读完1.txt事件
 * 2.当读取完成的时候会除非这个事件
 * 3.当这个事件触发的时候拿到文件名，然后去读取文件名对应的内容
 */
/*fs.readFile('1.txt','utf8', function(err, data){
	fs.readFile('2.txt','utf8', function(err, data){
		console.log(data);
	});
});
fs.readFile(data,'utf8', function(err,data){
	console.log(data);
});*/


var file=new EventEmitter();

fs.readFile('1.txt','utf8',function(err,data){
	file.emit('Start',data);
})

file.on('Start',function(data){

	fs.readFile(data,'utf8',function(err,data){
		console.log(data);
	})

})




