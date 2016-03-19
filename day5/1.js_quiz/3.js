/**
 *执行上下文环境：
 * this
 * 作用域链 找自由变量（没有在当前作用域下声明的变量）
 * VO（活动对象）
 *      ｛
 *          x:1
 *      ｝
 */
var s = (function (x) {
    'use strict'
    //length callee
    console.log(arguments);
    //这个x是从函数执行上下文环境中的VO里取值的
    arguments[0] = 100;
    //如果是参数的话，是不可能删除的，因为它是不可配置的
    //delete x;
    return arguments[0];
})(1);

console.log(s);

/*
 var obj = {name:'zfpx'};
 with(obj){//with
 //delete name;
 console.log(name);
 }*/

var obj = {};
Object.defineProperty(obj,'name',{
    value: 'zfpx',//它的值
    writable: false,//是否只读，是否修改
    enumerable:true,//是否可枚举
    configurable:true//是否看配置,是否可以删除此属性
})
console.log(obj.name);//zfpx
obj.name = 'zfpx2';//writable: false，改不了
console.log(obj.name);//zfpx

