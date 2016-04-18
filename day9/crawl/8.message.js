/**
 *child_process即子进程可以创建一个系统子进程并执行shell命令
 * child_process.spawn(command, [args], [options])
 */
var child_process = require('child_process');
var spawn = child_process.spawn;
//执行一个命令，开启一个子进程
var subProcess = spawn(process.execPath, ['client.js']);
//标准输出
subProcess.stdout.on('data', function(data){
	console.log(data.toString());
});

/*subProcess.on('exit', function(){
	console.log('活儿干完了，下班收工了');
});*/
subProcess.on('error', function(error){
	console.log(error);
})
subProcess.on('message', function(){
	console.log(arguments);
})

//主进程 可以继续执行
console.log('continue');