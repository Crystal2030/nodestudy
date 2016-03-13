/**
 *1.安装 npm install express
 * 2.使用
 */
//加载express
var express = require('express');
//获取配置对象
var app = express();

//使用中间件
//计算一个处理请求一共花了多少时间
/**
 *
 */
app.use(function(req,res,next){
    res.start = Date.now();
    console.time('cost');
    //暂存原来的end方法
    var originalEnd = res.end;
    //为res.edn重新赋值为我们自定义函数
    res.end = function(){
        //先把原来的edn方法调用一次
        originalEnd.apply(res,Array.prototype.slice.call(arguments));
        //加入自己的小逻辑
        console.log('timecost:',Date.now()-res.start);
    }
    console.timeEnd('cost');
    next();
});

//中央
app.use('/money',function(req,res,next){
    var start = Date.now();
    res.mny = 100;
    next();//往下走
});
//省里
app.use('/hello',function(req,res,next){
    res.mny = res.mny-10;
    next();
})
//市里
app.use('/money',function(req,res,next){
    res.mny = res.mny-30;
    next();
})
//村里
app.use(function(req,res,next){
    res.mny = res.mny-60;
    res.send('0');
})
//发送补贴 100
app.get('/money',function(req,res){
    res.send('response money'+res.mny);
})

//启动服务器
app.listen(3000);