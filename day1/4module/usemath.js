/**
 * Created by crystal on 2016/3/5.
 */
var math = require('./math.js');
console.log(math.a);
console.log(math.add(1, 3));
var math = require('./math.js');//“aaaaa”只会执行打印一次，因为之前的被缓存起来了