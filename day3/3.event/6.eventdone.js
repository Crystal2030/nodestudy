/**
 * Created by crystal on 3/14/16.
 */
var EventEmitter = require('events');
var fs = require('fs');

var person = {};
var evt = new EventEmitter();

evt.on('data', out);

fs.readFile('name.txt','utf8', function(err, data){
    person.name = data;
    //读完发射一个事件
    evt.emit('data');
})

fs.readFile('age.txt','utf8', function(err, data){
    person.age = data;
    //读完发射一个事件
    evt.emit('data');
})

function out(name, age){
    if(person.name && person.age){
        console.log(person.name, person.age);
    }
}