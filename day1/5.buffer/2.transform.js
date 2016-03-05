//buf.toString([encoding[,start[,end]]]);
var buffer = new  Buffer('刘云', 'utf8');
console.log(buffer);
//buffer转字符串
console.log(buffer.toString('utf8',3,6));