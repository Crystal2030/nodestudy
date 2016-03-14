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

var ring = function(who){
    console.log(who + ' receive the gift.');
};
var drop = function(who){
    console.log(who + ' dropped the ring');
};

//on 和 addListener是一样的
jinglebell.on('ring', ring);
jinglebell.on('ring', ring);
jinglebell.removeListener('ring', ring);//移除drop监听

jinglebell.emit('ring','Dog');
//jinglebell.removeListener('ring', ring);//移除drop监听
jinglebell.emit('ring','Cat');


jinglebell.once('drop',drop);
jinglebell.once('drop',drop);
/**
 * drop事件调用的是once方法，所以即使发射两次drop事件，它也只能执行一次
 */
jinglebell.emit('drop','Deer');
jinglebell.emit('drop', 'The old man');

//console.log(jinglebell.listeners('ring'));//2个函数