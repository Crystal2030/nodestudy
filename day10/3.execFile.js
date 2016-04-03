//child_process.execFile(file, args, options, callback)
var child_process = require('child_process');
var execFile = child_process.execFile;
execFile(process.execPath, ['client.js'], function(err, stdout, stderr){
	console.log(stdout);
});

console.log(process.execPath);