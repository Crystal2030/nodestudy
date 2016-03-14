/**
 * Created by crystal on 3/14/16.
 * 事件
 * 订阅发布
 */
function Person(name){
    this.name = name;
    this._events = {};
}

//注册监听
Person.prototype.on = function(eventName, callback){
    if(this._events[eventName]){//有人已经订阅过了这个事件
        this._events[eventName].push(callback);
    }else{
        this._events[eventName] = [callback];
    }

}

Person.prototype.emit = function(eventName){
    var args = Array.prototype.slice.call(arguments,1);//arguments是个类数组，需要转成数组
    var callbacks = this._events[eventName];
    var self = this;
    callbacks.forEach(function(callback){
        console.log(self);
        callback.apply(self, args);
    })
}

Person.prototype.removeListener = function(eventName,callback){
    this._events[eventName] = this._events[eventName].filter(function(cb){
        return cb != callback;
    });
}

Person.prototype.once = function(eventName, callback){
    function callonce(){
        callback.apply(this, arguments);
        console.log('this=',new Person);
        console.log('this=',this);
        this.removeListener(eventName, callonce);
    }
    this.on(eventName, callonce);
}

var girl = new Person();
/*girl.on('长发及腰',function(){
    console.log('哥来娶你可好');
})

girl.on('长发及腰',function(){
    console.log('记得找我聊聊天');
});*/

girl.once('hungry', function(what){
    console.log('Got to eat ' + what);
});




//girl.emit('长发及腰');
girl.emit('hungry', 'lunch');
girl.emit('hungry', 'breakfest');