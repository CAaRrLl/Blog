var db=require('../common/db');
var logger=require('../common/logger').logger;

//添加用户
var add_user=function(name,email,phone,password){
    var sql=`insert into user(name,email,phone,password,createtime,updatetime) values(?,?,?,?,?,?) 
        where not exists (select * from user where email=? and phone=?)`;
    var now=new Date();
    db.queryQarams(sql,[name,email,phone,password,now,now,email,phone],function(err,result){
        if(err){
            logger.error(err);
            return;
        }
        //todo
        logger.debug('新增用户成功',result);
    });
}
exports.add_user=add_user;

//删除用户(假删除) 用事务 todo
var delete_user=function(id){
    var sql=`update user set status = -1,updatetime = ? where id = ?`;
    var now=new Date();
    db.queryQarams(sql,[now,id],function(err,result){
        if(err){
            logger.error(err);
            return;
        }
        //todo
        logger.debug('删除用户成功',result);
    })
}
exports.delete_user=delete_user;

//冻结用户
var lock_user=function(id){
    var sql=`update user set status = 0,updatetime =? where id = ?`;
    var now=new Date();
    db.queryQarams(sql,[now,id],function(err,result){
        if(err){
            logger.error(err);
            return;
        }
        //todo
        logger.debug('冻结用户成功',result);
    })
}
exports.lock_user=lock_user;

//设置昵称，头像和备注
var set_portrait=function(id,name,portrait,mark){
    var sql=`update user set name=?,portrait = ?,mark=?,updatetime=? where id = ?`;
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

//获取用户列表
var get_users=function(callback){
    var sql=`select * from where status!=-1`;
    db.query(sql,function(err,result){
        if(err){
            logger.error(err);
            callback(err,null);
            return;
        }
        //todo
        logger.debug('获取用户列表成功',result);
        callback(null,result);
    });
}
exports.get_users=get_users;

var table=`
create table if not exists user(
    id int auto_increment primary key,
    name varchar(20) not null,       
    email varchar(20) not null,    
    phone varchar(20) not null,   
    password varchar(20) not null,      
    portrait varchar(50),    
    status int default 1,            
    level int default 1,              
    remark varchar(30),               
    createtime datetime, 
    updatetime datetime 
)`;
exports.table=table;