var querystring = require('querystring');
var s = 'name=crystal&age=18';
console.log(querystring.parse(s));//转成对象
console.log(querystring.stringify(querystring.parse(s)));//对象转成字符串

