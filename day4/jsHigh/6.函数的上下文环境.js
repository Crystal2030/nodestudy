
var a = 1;
/**
 * 函数的上下文环境，只有执行的时候才会被创建，当函数执行完后，这个上下文环境以及其中的数据都会被消除，再重新回到全局上下文环境。处于活动状态的执行上下文只有一个
 * this
 * var 函数声明
 *
 *
 *
 * arguments 形参 length callee 类数组
 *
 */

{

}
function fn1() {
    var a = 10;
    console.log(a);
    function fn2() {
        var b = 5;
        //VO=var 函数声明 arguments
        // 先从当前的上下文环境中VO（variable object）中找
        //如果VO
        console.log(b);
        console.log(a);
        console.log(c);
    }
}
fn1();