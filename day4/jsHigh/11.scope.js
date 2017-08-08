//同一个作用域下， 不同的调用会产生不同的执行上下文关系，继而产生不同的变量的值。
function one() {
    var a = Math.random();
    return function() {
        return a;
    }
}
var s1 = one();
var s2 = one();
console.log(s1(), s2());