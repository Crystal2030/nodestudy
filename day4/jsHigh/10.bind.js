// 5.call apply bind中的this
function say(city, word){
    console.log(this.name, city, word);
}
say('乐乐', '你好');

var person = {name: 'zfpx'};
say.apply(person, ['乐乐', '你好']);
say.call(person, 'lele','hello');

var newSay = say.bind(person,'city');
newSay('word');