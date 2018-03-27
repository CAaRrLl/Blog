var db=require('../common/db');
var logger=require('../common/logger').logger;

//添加文章信息
var add_fileinfo=function(id,filename,uploader,callback){
    var sql=`insert into fileinfo values(?,?,?,?)`;
    var now=new Date();
    db.queryQarams(sql,[id,filename,uploader,now],function(err,result,fields){
        if(err){
            callback(err,null);
            return;
        }
        callback(null,result);
    });
}
exports.add_fileinfo=add_fileinfo;

//删除文章信息
var delete_fileinfo=function(id){
    var sql=`delete from fileinfo where id=?`;
    db.queryQarams(sql,[id],function(err,result,fields){
        if(err){
            callback(err,null);
            return;
        }
        callback(null,result);
    });
}
exports.delete_fileinfo=delete_fileinfo;

var table=`
create table if not exists fileinfo(
    id varchar(50) primary key,
    filename varchar(20),  
    uploader varchar(20),  
    uploadtime datetime           
)`;
exports.table=table;