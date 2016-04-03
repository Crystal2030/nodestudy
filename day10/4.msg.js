/**
 *child process：子进程，可以创建一个系统子进程，并执行shell命令
 */
var child_process = require('child_process');

//创建子进程的两个方法
//1.spawn :通过事件监听
//2.exec：通过回调函数
var spawn = child_process.spawn;
//执行一个命令，开启一个子进程
var subProcess = spawn(process.execPath, ['client.js']);
//subProcess.stdout：readable 流
subProcess.stdout.on('data', function(data){
	console.log(data.toString());
});

subProcess.on('error', function(error){
	console.log(error);
})


subProcess.on('message', function(){
	console.log(arguments);
})

subProcess.on('exit', function(){
	console.log('活干完，下班');
})
console.log('continue');