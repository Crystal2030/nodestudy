var fs = require('fs');
console.log(process.cwd());
process.chdir('txt');
//console.log(process);
console.log(fs.readFileSync('index.txt','utf8'));

