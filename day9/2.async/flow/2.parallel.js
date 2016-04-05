/**
 * 并行执行异步任务
 * @type {async|exports}
 */
var async = require('async');

console.time('parallel');
async.parallel([
	function(cb){
		setTimeout(function(){
			console.log('看电视');
			cb('wrong', '看电视');
		}, 3000);
	},
	function(cb){
		setTimeout(function(){
			console.log('吃饭');
			cb(null, '吃饭');
		}, 1000);
	}
],function(err, result){
	console.error(err);
	console.log(result);
	console.timeEnd('parallel');
})
