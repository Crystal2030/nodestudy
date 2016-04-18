/*child_process.execFile(file, args, options, callback)
file {String} 要运行的程序的文件名
args {Array} 字符串参数列表
options {Object}
	cwd {String} 子进程的当前工作目录
	env {Object} 环境变量键值对
	encoding {String} 编码（缺省为 'utf8'）
	timeout {Number} 超时（缺省为 0）
	maxBuffer {Number} 最大缓冲（缺省为 200*1024）
	killSignal {String} 结束信号（缺省为 'SIGTERM'）
callback {Function} 进程结束时回调并带上输出
	error {Error}
	stdout {Buffer}
	stderr {Buffer}
返回：ChildProcess 对象*/
var child_process = require('child_process');

var execFile = child_process.execFile;

console.log(process.execPath);//D:\Soft\nodejs\node.exe
execFile(process.execPath,['client.js'], function(err, stdout, stderr){
	console.log(stdout);
});