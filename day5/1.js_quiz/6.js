var foo = {
    bar: function(){
        return this.baz;
    },
    baz: 1
};
//运算符
var s = typeof (f = foo.bar)();
console.log('s', s);//undefined

var i = 0;
//逗号隔开的多个表达式，然后这些表达式从左到右一次执行，返回最后一个结果
var j = (i++, i++, i++);
console.log('j',j);//2

/**
 * 如果函数声明有多次，后面的会覆盖前面的
 * 如果表达式的话，如果声明多次会忽略后面的声明
 */
var x= (function(){
    var f = function(){return 1};
    return f;
    var f = function(){
        return 2;
    }
})
console.log(x);//2


