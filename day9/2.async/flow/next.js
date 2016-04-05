var tasks = [
	function(next){
		console.log(1);
		next();
	},
	function(next){
		console.log(2);
		next();
	}
];

var i = 0 ;
function next(err, data){
	if(err){
		throw Error(err);
	}
	console.log(data);
	if(i>=tasks.length){
		return;
	}
	var task = tasks[i++];
	task(next);
}
next();