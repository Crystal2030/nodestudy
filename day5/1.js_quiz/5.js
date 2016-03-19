var foo = {
    bar: function(){
        return this.baz;
    },
    baz: 1
};

var s = (function(){
    /*var arguments = {
        '0': foo.bar
    }
    arguments['0']
    */
    return typeof arguments[0]();
})(foo.bar);

console.log(s);




/*
var obj = {
    '0': function(){
        console.log(this);
    }
}
console.log(obj['0']);*/
