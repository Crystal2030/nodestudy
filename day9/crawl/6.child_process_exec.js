/**
 *child_process即子进程可以创建一个系统子进程并执行shell命令
 * child_process.exec(command, [options], callback)
 * command {String} 将要执行的命令，用空格分隔参数
 */
var child_process = require('child_process');
var exec = child_process.exec;
//执行一个命令，开启一个子进程
var subProcess = exec('curl http://localhost:8080');
//标准输出
subProcess.stdout.on('data', function(err, stdout, stderr){
	console.log(stdout);
});

//主进程 可以继续执行
console.log('continue');