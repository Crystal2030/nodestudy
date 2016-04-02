/**
 * 连接池是一种创建产管理 连接的技术
 * 1.减少连接事件
 * 2.简化编程模型
 * 3.资源受控制
 */

var mysql = require('mysql');
var pool = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password:'',
	port: 3306,
	database: 'studb'
})

pool.query('select * from user', function(err, rows){
	console.log(rows);
});
