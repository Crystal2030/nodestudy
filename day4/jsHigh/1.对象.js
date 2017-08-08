var obj = {name: 'zfpx'};
var obj2 = new Object();

obj2.age = 18;
console.log(obj2);

var arr = [1,2,3];
var arr2= new Array(3,2);
arr2.age = 5;
console.log(arr2);

//函数声明
function fn() {
    console.log('hello');
}
console.log(fn instanceof Object);

/**
 * 判断变量类型的几种方法：
 * 1. typeof 基本类型和function
 * 2. instanceof 通过原型链来判断判断不同的对象类型
 * 3. toString.call(fn);  [object Function]
 * 4. 通过变量的一些特征来判断
 * 5. 通过constructor来判断, constructor有可能被修改
 */

console.log(Object.prototype.toString.call(fn)); //[object Function]

console.log(!!fn.bind);

//fn Function
Function.prototype.constructor = Object;
console.log(fn.__proto__.constructor == Function);

/**
 *  1. 函数名 fn
 *  2. 函数参数 都是字符串形式
 *  3. 函数体 最后一个参数
 */
var fn = new Function('a','b', 'console.log(a+b)');
fn(1,3);