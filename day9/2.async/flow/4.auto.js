var async = require('async');

async.auto({
	water: function(cb){
		console.time('cost');
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
	mix: ['water', 'flour', function(cb, results){
		setTimeout(function(){
			console.log(arguments);
			cb(null, results.water + results.flour);
		},3000);
	}],
	steam: ['mix', function(cb, results){
		setTimeout(function(){
			cb(null, results.mix + '+' + '蒸')
		},4000);

	}]
},function(err, result){
	console.timeEnd('cost');
	console.log(result);
})