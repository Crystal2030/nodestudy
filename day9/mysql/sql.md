#连接数据库
```
 mysql -uroot -p123456 -h123.57.143.189
```
>MYSQL环境，是支持你打回车换行的，只有你打了分号，才算是结尾

#创建表并指定主键
```
create table student(id int primary key,name varchar(50));
create table student(id int primary key auto_increment,name varchar(50));
```
#打开数据库
```
use studb
```

#查看当前打开的数据库
```
show database()
```

#创建表并指定主键
```
 create table student(id int primary key,name varchar(50));
```
#显示数据库下面所有的表
```
show tables
```

#删除一个表
>drop table student

#插入一条记录
```
 insert into student(id,name) values(1,'张三');
```
#查询表中所有的记录，查询所有列
```
select * from student;
```

#更新记录
```
update student set name='xzw' WHERE id=1;
```
#删除记录
```
delete from student where name='xzw'
```

#查询全班语文平均成绩
```
select AVG(grade.score) from grade,course where grade.cid = course.id and course.name = '语文'
```

#查询每个学生的平均成绩
```
--  查询每个学生的平均成绩
-- 一个分组的条件，一个是聚合后的结果
-- 当group by之后select之后只能出现两者，一个分组的条件，一个是聚合
select student.name,AVG(grade.score) from grade,course,student
where grade.cid = course.id and grade.sid = student.id
group by student.name
```
#按总分进行全班排名
```
select student.name,SUM(grade.score) from grade,student where grade.cid = student.id group by student.name
```