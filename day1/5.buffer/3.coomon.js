var buf1 = new Buffer('我');
var buf2 = new Buffer('爱');
var buf3 = new Buffer('中');
var buf4 = new Buffer('国');

//合并：Buffer.concat(list[,totalLength]);
/*var all = Buffer.concat([buf1,buf2,buf3,buf4],12).toString();
console.log(all);

var s = all.slice(9,12);
console.log(s);*/

//复制Buffer： Buffer.copy(targetBuffer,targetStart,sourceStart,sourceEnd);
var buffers = new Buffer(12);
buf1.copy(buffers,0,0,3);
buf2.copy(buffers,3,0,3);
buf3.copy(buffers,6,0,3);
buf4.copy(buffers,9,0,3);
console.log(buffers.toString('utf8', 0, 3));

