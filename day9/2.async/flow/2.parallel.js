/**
 * 并行执行异步任务:
 * parallel 的原理是同时并行处理每一个流程,最后汇总结果,如果某一个流程出错就退出
 *
 * I need to run multiple tasks that doesn't depend on each other and when they all finish do something else
 * Then you should use async.parallel.
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
