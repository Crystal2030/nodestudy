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
 *limit函数的基本用法
 * 1.限制数量：find(Conditions,fields,options,callback);
 */
PersonModel.find({name:/zfpx/},null,{limit:2},function(err,docs){
    //console.log(docs);
});

/**
 *skip函数的基本用法
 * 跳过数量：find(Conditions,fields,options,callback);
 */
PersonModel.find({},null,{skip:4},function(err,docs){
    //console.log(docs);
});

/**
 * sort函数的基本用法
 * 结果排序：find(Conditions,fields,options,callback);
 */
PersonModel.find({},null,{sort:{age:-1}},function(err,docs){
    //查询所有数据，并按照age降序顺序返回数据docs
    //console.log(docs);
});

/**
 * 现在要分页查询，查询第2页
 * skip跳过的条数 limit限制返回的条数 sort排序 1升序 -1降序
 */
PersonModel.find({},null,{limit:3,skip:3,sort:{age:-1}},function(err,docs){
    console.log(docs);
})