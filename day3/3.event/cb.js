function Person(name){
    this.name = 'zfpx';
}
/**
 * new 的过程：
 * 1.创建一个空对象
 * 2.把空对象作为this 传入Person
 * 3.返回这个对象
 * @type {Person}
 */
var p = new Person;
console.log(p.name);

var P2 = Person.bind({name:'px'});
var p2 = new P2;
console.log(p2.name);