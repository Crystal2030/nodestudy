/**
 * Created by crystal on 2016/3/5.
 */
function Person(name){
    this.name =name;
}
module.exports = Person;

//return module.exports;

/**
 *1.如果以属性方式的话，用exports module.exports效果一样
 * 2. 如果需要到处一个引用类型，只使用module.exports
 **/