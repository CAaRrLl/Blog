var db=require('../common/db');
var logger=require('../common/logger').logger;

//收藏文章
var collect=function(id,hostid,callback){
    var sql=`insert into collection values(?,?)`;
    db.queryQarams(sql,[id,hostid],function(err,result,fields){
        if(err){
            callback(err,null);
            return;
        }
        callback(null,result);
    });
}
exports.collect=collect;

//获取某篇文章的收藏数
var get_collect_count=function(id,callback){
    var sql=`select count(*) as count from collection where id=?`;
    db.queryQarams(sql,[id],function(err,result,fields){
        if(err){
            callback(err,null);
            return;
        }
        callback(null,result[0].count || 0);
    });
}
exports.get_collect_count=get_collect_count;

//获取某个用户收藏的文章
var get_collect_essay=function(hostid,callback){
    var sql=`select id from collection where hostid=?`;
    db.queryQarams(sql,[hostid],function(){
        if(err){
            callback(err,null);
            return;
        }
        callback(null,result);
    });
}
exports.get_collect_essay=get_collect_essay;

//取消收藏
var cancel_collect=function(id,hostid){
    var sql=`delete from collection where id=? and hostid=?`;
    db.queryQarams(sql,[id,hostid],function(err,result,fields){
        if(err){
            callback(err,null);
            return;
        }
        callback(null,result);
    });
}
exports.cancel_collect=cancel_collect;

var table=`
create table if not exists collection(
    hostid int,    
    id int,
    primary key (hostid,id)             
)`;
exports.table=table;