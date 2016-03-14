var EventEmitter = require('events');
var util = require('util');
/**
 *
 */
function Bell(name){
    this.name = name;
}
util.inherits(Bell, EventEmitter);

var jinglebell = new Bell('jingle');

//on 和 addListener是一样的
jinglebell.on('ring', function(){
    console.log('receive the gift1.');
});
jinglebell.addListener('ring', function(){
    console.log('receive the gift2.');
});

var drop = function(who){
    console.log(who + ' dropped the ring');
}
jinglebell.once('drop',drop);


jinglebell.emit('ring');
//jinglebell.removeListener('drop', drop);//移除drop监听
/**
 * drop事件调用的是once方法，所以即使发射两次drop事件，它也只能执行一次
 */
jinglebell.emit('drop','Deer');
jinglebell.emit('drop', 'The old man');

console.log(jinglebell.listeners('ring'));//2个函数