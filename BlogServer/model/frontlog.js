var db=require('../common/db');
var logger=require('../common/logger').logger;

//添加日志
var add_log=function(id,level,pos,define,createtime,callback){
    var sql=`insert into frontlog values(?,?,?,?,?)`;
    db.queryQarams(sql,[id,level,pos,define,createtime],function(err,result,fields){
        if(err){
            callback(err,null);
            return;
        }
        callback(null,result);
    });
}
exports.add_log=add_log;

var table=`
create table if not exists frontlog(
    id int auto_increment primary key,
    level varchar(10) not null,   
    pos varchar(100) not null,          
    define varchar(100),                  
    createtime datetime not null              
)`;
exports.table=table;