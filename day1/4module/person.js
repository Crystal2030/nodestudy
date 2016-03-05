/**
 * Created by crystal on 2016/3/5.
 */
function person(){
    console.log("I'm person1");
}

//console.log(module);
exports.person = person;

//return module.exports;

/**
 *1.如果以属性方式的话，用exports module.exports效果一样
 * 2. 如果需要到处一个引用类型，只使用module.exports
 **/