module.exports = function (req, callback){
    var result = '';
    req.on('data',function(err,data){
        result += data;
    })
    req.on('end',function(){
        callback(result);
    })
};