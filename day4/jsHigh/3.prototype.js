// 1. 通过new Function来创建一个函数的实例
var Foo = new Function('a', 'b', 'return a+b;');
// 2. 当创建Add函数的时候，会自动送一个add.prototype对象
var o1 = new Object();
// 创建的对象的__proto__等于构造函数的prototype
console.log(o1.__proto__ === Object.prototype);

/**
 *1. prototype叫原型，构造函数的属性
 * 2. __proto__叫隐式原型 通过构造函数构造出来的对象的属性
 */

var f1 = new Foo();
console.log(f1 instanceof Foo);

console.log(f1 instanceof Object);