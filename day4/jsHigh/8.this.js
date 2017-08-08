
function say() {
    console.log(this);
}
// 1. 全局&调用普通函数
say(); // this 是window

// 2.函数作为对象的一个属性
var person = {
    say: say
};
person.say(); //this是调用它的对象

/**
 * 3.构造函数{:&.moveIn}
 *  a. 当函数没有返回指定时候，new的时候返回this
 *  b. 当函数有返回值的时候
 * @constructor
 */
function Person() {
    this.name = 'zfpx';
    console.log(this);
    //当return的是一个非对象类型的话，那么也返回this
    // return 3;
    //如果返回的是一个对象类型动画，那么this这个对象
    // return {age: 3}
}
var p = new Person();
console.log(p);

//4.prototype中的this: 当前调用者,即p
Person.prototype.getName = function() {
    console.log(this.name);
}
p.getName();

// 5.call apply bind中的this
function say(city, word){
    console.log(this.name, city, word);
}
say('乐乐', '你好');
say.apply(this, [])
