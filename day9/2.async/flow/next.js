var tasks = [
	function(cb){
		console.log(1);
		cb();
	},
	function(cb){
		console.log(2);
		cb();
	}
];

var i = 0 ;
function next(err, data){
	if(err){
		throw Error(err);
	}
	console.log(data);
	var task = tasks[i++];
	task(next);
}
next();