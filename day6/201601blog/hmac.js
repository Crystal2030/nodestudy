/**
 * Created by Crystal on 2016/3/23.
 */
var crypto = require('crypto');

var s = crypto.createHmac('md5', '333').update('hello').digest('hex');

console.log(s);