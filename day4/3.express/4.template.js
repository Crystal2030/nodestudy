var express = require('express');

var app = express();

/**
 * 1.动态内容 当前时间
 * 2.静态内容 当前tmpl.html
 * 3.动静结合
 */
app.get('/',function(req,res){

});

//渲染模版
function render(tmpl, data){
    //把变量进行替换
    return tmpl.replace(/\{\{(\w+)\}\}/, function(input,group1){
        console.log(input);
        console.log(group1);
        console.log(data[group1]);
        return data[group1];
    })
}
//把模版里的变量替换对象里的属性，变量和属性名一定要想通
var result = render('<h1>{{name}}</h1>',{name:'Welcome'});
console.log(result);

