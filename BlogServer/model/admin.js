var db=require('../common/db');
var logger=require('../common/logger').logger;

//删除管理员(假删除)
var delete_admin=function(id){
    var sql=`update admin set status = -1,updatetime=? where id = ?`;
    var now=new Date();
    db.queryQarams(sql,[now,id],function(err,result){
        if(err){
            logger.error(err);
            return;
        }
        //todo
        logger.debug('删除管理员成功',result);
    })
}
exports.delete_admin=delete_admin;

//冻结管理员
var lock_admin=function(id){
    var sql=`update admin set status = 0,updatetime=? where id = ?`;
    var now=new Date();
    db.queryQarams(sql,[now,id],function(err,result){
        if(err){
            logger.error(err);
            return;
        }
        //todo
        logger.debug('冻结管理员成功',result);
    })
}
exports.lock_admin=lock_admin;

//设置昵称，头像和备注
var set_portrait=function(id,name,portrait,mark){
    var sql=`update admin set name=?,portrait = ?,mark=?,updatetime=? where id = ?`;
    var now=new Date();
    db.queryQarams(sql,[name,portrait,mark,now,id],function(err,result){
        if(err){
            logger.error(err);
            return;
        }
        //todo
        logger.debug('设置昵称、头像和备注成功',result);
    })
}
exports.set_portrait=set_portrait;

var table=`
create table if not exists admin(
    id int auto_increment primary key, 
    name varchar(20) not null, 
    email varchar(20) not null, 
    phone varchar(20) not null,  
    password varchar(20) not null, 
    portrait varchar(50),  
    status int default 1,     
    level int default 2,  
    remark varchar(30),  
    createtime datetime, 
    updatetime datetime 
)`;
exports.table=table;