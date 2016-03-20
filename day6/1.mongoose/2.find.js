//1.加载模块
var mongoose = require("mongoose");
//2.连接数据库mongod 服务端 mongo客户端
var db = mongoose.connect("mongodb://localhost:27017/zfpx");
//连接成功会执行error回调
db.connection.on("error", function (error) {
    console.log("数据库连接失败：" + error);
});
//连接成功会执行open回调
db.connection.on("open", function () {
    console.log("数据库连接成功");
});

//定义一个schema，描述此集合里有哪些字段，字段是什么类型
//只有schema中有的属性才能被保存到数据库中
var PersonSchema = new mongoose.Schema({
    name : { type:String },
    home : { type:String },
    age  : { type:Number, default:0 },
    time : { type:Date, default:Date.now },
    email: { type:String,default:''}
});


//var db = mongoose.connect("mongodb://123.57.143.189:27017/zfpx");

// 创建Model(模型):可以用它来操作数据库中的person集合
/**
 * person：数据库中的集合名称,当我们对其添加数据时如果person已经存在，
 * 则会保存到其目录下，
 * 如果未存在，则会创建person集合，然后在保存数据。
 */
var PersonModel = db.model("person", PersonSchema);

PersonModel.find({name:'zfpx'}, function(err, docs){
    if(err){
        console.error(err);
    }else{
        console.log(docs);
    }
})

for(var i = 1 ; i <= 10 ; i++){
    PersonModel.create({name:'zfpx'+i, age: i}, function(err, doc){
        if(err){
            console.error(err);
        }else{
            console.log(doc);
        }
        //所有的一部方法都在所有的同步方法执行完毕之后才执行
        console.log(i);
    });
}