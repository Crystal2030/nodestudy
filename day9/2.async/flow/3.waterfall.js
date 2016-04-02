var async = require('async');

/**
 * 跟串行很像，但是waterfall每个函数产生的返回值都会作为参数传递给第二个参数
 */
async.waterfall([
	function(cb){//第一个没有data参数
		setTimeout(function(){
			cb(null, '看电视');
		}, 3000);
	},
	function(data,cb){
		setTimeout(function(){
			cb(null, data+'->吃饭');
		}, 2000);
	},
	function(data,cb){
		setTimeout(function(){
			cb(null, data+'->做作业');
		}, 2000);
	}
],function(err, result){
	console.error(err);
	console.log(result);
})
