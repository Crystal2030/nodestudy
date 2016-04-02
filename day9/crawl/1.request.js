//npm install request
//npm install iconv-lite
var request = require('request');
var iconv = require('iconv-lite');//GBK到UTF8的编码转换
var cheerio = require('cheerio');


request({url:'http://top.baidu.com/category?c=10&fr=topindex', encoding:null}, function(err, response, body){
	var result = iconv.decode(body, 'gbk');
	var $ = cheerio.load(result);
	$('.hd .title a').each(function(){
		var $me = $(this);
		console.log($me.text());
	})
})