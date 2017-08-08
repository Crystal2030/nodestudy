// 5.call apply bind中的this
function say(city, word){
    console.log(this.name, city, word);
}
say('乐乐', '你好');

var person = {name: 'zfpx'};
say.apply(person, ['乐乐', '你好']);
say.call(person, 'lele','hello');

//迭代输出每一个元素
function each() {
    console.log(Array.prototype.forEach.call);
    Array.prototype.forEach.call(arguments, function(item){
        console.log(item);
    });
    Array.prototype.forEach.apply(arguments, [function(item){
        console.log(item);
    }]);
}
each(1,2,3,4,5);
// [1,2,3].forEach(function(item){
//     console.log(item);
// })