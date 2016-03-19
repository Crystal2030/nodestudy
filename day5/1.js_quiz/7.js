//new 的时候，如果没有返回值，或返回基本类型，返回this
//如果返回的是一个引用类型，那么返回就是这个引用
function f(){
    return f;
}
new f() instanceof f;
/**
 * 1.instanceof
 *  运算符左边的是实例，沿着__proto__
 *  右边的是构造函数，找到它的prototype
 */

console.log(new f() instanceof f);//false