var fs = require('fs');
var path = require('path');
//mk dir
//1.create directory
/*fs.mkdir('test/t1/t2', function(err){
    if(err) {
        console.log('Failed to create directory.');
    }else{
        console.log('Create directory successfully!')
    }
});*/

//创建文件夹，如果负文件夹不存在的话，则需要自动创建
//作业
function makep(path, callback){
    //1.把这个参数转成数组
    //2.依次判断各个目录是否存在，如果存在，跳过去；如果不存在，则创建此目录
    //3.最后创建一个最终目录
}

//2.read all files under directories
/*fs.readdir('./book', function(err, files){
    console.log(files);
})*/

//3.获取一个文件或目录的详情
fs.readdir('./book', function(err, files){
    //循环文件列表
    files.forEach(function(file){
        //获取文件的详情
        fs.stat(path.join('./book',file), function(err, state){
            console.log(state.isDirectory());
            console.log(state.isFile());
            console.log(state);
            console.log(state.size);
        })
    })
})


//4.判断一个文件(或文件夹)是否存在
/*
fs.exists('./book', function(exists){
    console.log(exists);
})*/
