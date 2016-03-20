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

/**
 * field省略或为Null，则返回所有属性。
 * 如果不知道字段默认不返回
 * 1表示显示 0 表示不显示
 * _id如果不知道也会返回，如果不详让他返回需要显示指定为0
 */
PersonModel.find({}, {name:1,age:1,_id:0},function(err, docs){
    console.log(docs);
});
//当遭到第一条匹配的记录时就理科返回，不再继续查找了，返回单个对象
PersonModel.findOne({age:6}, function(err, doc){
    console.log(doc);
})
//可以用正则匹配
PersonModel.findOne({name:/^\w+9$/}, function(err, doc){
    console.log(doc);
})
//按照ID进行查询
PersonModel.findById('56ee104ed8734eec2c503cf5', function(err, doc){
    console.log(doc);
})
