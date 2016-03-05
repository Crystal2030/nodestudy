//Buffer 类似于数组
//Buffer 里面只能放自己 0-255
//指定大小
var buffer = new Buffer(1);
buffer[0] = 10;
console.log(buffer);

//通过字符串来创建
console.log(new Buffer('crystal'));

//通过数组来创建
console.log(new Buffer([1,2,3]));