/**
 * Created by crystal on 3/14/16.
 */
var fs = require('fs');

var count = 0;
var person = {};
fs.readFile('name.txt','utf8', function(err, data){
    person.name = data;
    if(++count == 2){//两个任务都完成就调用out
        out();
    }
})

fs.readFile('age.txt','utf8', function(err, data){
    person.age = data;
    if(++count == 2){//两个任务都完成就调用out
        out();
    }
})

function out(name, age){
    console.log(person.name, person.age);
}