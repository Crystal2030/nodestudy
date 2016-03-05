/**
 * Created by crystal on 2016/3/5.
 */
var modules = {};
var module = {exports: {}};
function math(){
    var exports = module.exports;
    // ----
    var a = 'hello';
    exports.a = a;
    exports = function(){}
    // ----
    return module.exports;
}

var m = math();
var m2 = math();
console.log(m === m2);