/**
 * 串行执行异步任务
 * @type {async|exports}
 */
var async = require('async');

async.parallel([
	function(cb){
		setTimeout(function(){
			console.log('看电视');
			cb(null, '看电视');
		}, 3000);
	},
	function(cb){
		setTimeout(function(){
			console.log('吃饭');
			cb('wrong', '吃饭');
		}, 3000);
	}
],function(err, result){
	console.error(err);
	console.log(result);
})
