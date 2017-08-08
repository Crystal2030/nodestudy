var EventEmitter = require('events');

var e = new EventEmitter();

EventEmitter.prototype.once = function(type, listener) {
    //是否已经出发过
    // var fired = false
    // 还是能吗一个新的函数
    function g(){
        //移除监听
        this.removeListener(type, g);
        //如果没有触发过的话
        if(!fired){
            fired = true;//状态改为已触发
            //调用一下原始的监听函数
            listener.apply(this, arguments);
        }
    }
    this.on(type, g);

    // return this
}
//精简版
EventEmitter.prototype.once = function(type, listener) {

    function g(){
        //移除监听
        this.removeListener(type, g);
        listener.apply(this, arguments);
    }
    this.on(type, g);
}