/**
 *child process：子进程，可以创建一个系统子进程，并执行shell命令
 */
var child_process = require('child_process');

//创建子进程的两个方法
//1.spawn
//2.exec
var exec = child_process.exec;
//执行一个命令，开启一个子进程
var subProcess = exec('curl http://localhost:8080', function(err, stdout, stderr){
	console.log(stdout);
});

console.log('continue');