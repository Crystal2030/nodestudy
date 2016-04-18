var async = require('async');

//如果你的逻辑代码很繁琐,涉及到很多的流程控制,但是部分流程是相互依赖的,部分又是无依赖关系而并行独立的.
console.time('auto cost');
async.auto({
	//water 和 flour是并行的，一共花费2秒
	water: function(cb){
		setTimeout(function(){
			cb(null, '水');
		},1000);
	},
	flour: function(cb){
		setTimeout(function(){
			cb(null, '面粉');
		},2000);

	},
	//定义依赖关系，mix和面依赖water和flour的任务完成
	mix: ['water', 'flour', function(results, cb){
		console.log(arguments);
		setTimeout(function(){
			cb(null, results.water + results.flour);
		},3000);
	}],
	steam: ['mix', function(results, cb){
		setTimeout(function(){
			cb(null, results.mix + '+' + '蒸')
		},4000);

	}]
},function(err, result){
	console.timeEnd('auto cost');
	console.log(result);
})