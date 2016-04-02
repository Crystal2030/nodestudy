var CronJob = require('cron').CronJob;
var job = new CronJob('1 */30 * * * *', function(){
	console.log('每分执行一次');
});
job.start();