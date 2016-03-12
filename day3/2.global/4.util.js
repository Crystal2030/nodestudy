var util = require('util');//帮助模块

function Parent(){
    this.name = 'father';
    this.age = 50;
    this.say = function(){
        console.log(this.name);
    }
}
Parent.prototype.showName = function(){
    console.log('show', this.name);
}
function Child(){
    Parent.call(this);//可以继承parent的私有属性
    this.name = 'child';
}

util.inherits(Child, Parent);//继承parent的prototype的属性

var c = new Child();
c.hobby = {
    name: 'play',
    price: {
        name: 'price'
    }
}
//console.log(c);
//c.showName();

//function temp(){}
//temp.prototype = Parent.prototype;
//Child.prototype = new temp();
//Object.setPrototypeOf(ctor.prototype,superCtor.prototype)

console.log(util.inspect(c,{depth:3}))