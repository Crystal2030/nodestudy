var s = (function (f) {//f
    return typeof f();
})(function () {
    return 1
});

cosnole.log(s);