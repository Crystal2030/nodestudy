var a = 10;
function fn() {
    console.log(a);//a的取值在定义时候确定，而非运行时确定
}

function bar(f) {
    var a = 20;
    f();
}

bar(fn);