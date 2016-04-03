var i = 0;
setInterval(function(){
	console.log(i++);
	if(i>=10){
		process.exit();
	}
},10);