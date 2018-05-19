var db=require('../common/db');
var logger=require('../common/logger').logger;

//添加文章信息
var add_fileinfo=function(id,filename,uploader,callback){
    var sql=`insert into fileinfo values(?,?,?,?)`;
    var now=new Date().getTime();
    db.queryQarams(sql,[id,filename,uploader,now],function(err,result,fields){
        if(err){
            callback(err);
            return;
        }
        callback(null);
    });
}
exports.add_fileinfo=add_fileinfo;

//检查某个文件是否存在
var check_fileinfo = function(id, callback) {
    var sql=`select count(*) as num from fileinfo where id=?`;
    db.queryQarams(sql,[id],function(err,result,fields){
        if(err){
            callback(err, null);
            return;
        }
        if(result[0].num>0) {
            callback(null, true);
        }else {
            callback(null, false);
        }
    });
}
exports.check_fileinfo = check_fileinfo;

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
    id varchar(100) primary key,
    filename varchar(20),  
    uploader varchar(20),  
    uploadtime bigint           
)`;
exports.table=table;