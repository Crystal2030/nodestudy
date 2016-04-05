/**
 * 串行执行异步任务:
 * 串行无关联模式要求每一步执行成功后才能执行下一步流程.所以是一个同步编程思想
 * @type {async|exports}
 */
var async = require('async');

console.time('series');
async.series({
	tv:function(cb){
		setTimeout(function(){
			console.log('看电视');
			cb(null, '看电视');// 第一个参数是异常错误,第二个参数的返回结果. 如果返回错误信息,下面的流程控制将会被中断,直接跳到最后结果函数
		}, 3000);
	},
	eat:function(cb){
		setTimeout(function(){
			console.log('吃饭');
			cb(null, '吃饭');
		}, 3000);
	}
},function(err, result){
	console.error(err);
	console.log(result);
	console.timeEnd('series');

})
