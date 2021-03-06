var db = require('../common/db');
var logger = require('../common/logger').logger;

//添加用户
var add_user=function(name,email,phone,password,callback){
    var sql=`insert into user(name,email,phone,password,createtime,updatetime) values(?,?,?,?,?,?)`;
    var now=new Date().getTime();
    db.queryQarams(sql,[name,email,phone,password,now,now],function(err,result){
        if(err){
            callback(err);
            return;
        }
        logger.debug('用户插入数据库成功',result);
        callback(null);
    });
}
exports.add_user=add_user;

//删除用户(假删除) 用事务 todo
var delete_user=function(id,callback){
    var sql=`update user set status = -1,updatetime = ? where id = ?`;
    var now=new Date().getTime();
    db.queryQarams(sql,[now,id],function(err,result){
        if(err){
            callback(err);
            return;
        }
        //todo
        logger.debug('删除用户成功',result);
        callback(null);
    })
}
exports.delete_user=delete_user;

//冻结用户
var lock_user=function(id,callback){
    var sql=`update user set status = 0,updatetime =? where id = ?`;
    var now=new Date().getTime();
    db.queryQarams(sql,[now,id],function(err,result){
        if(err){
            callback(err);
            return;
        }
        //todo
        logger.debug('冻结用户成功',result);
        callback(null);
    })
}
exports.lock_user=lock_user;

//设置昵称，头像和备注
var set_info = function(id, name, portrait, remark, callback){
    var sql = `update user set ${name?'name=?,':''}${portrait?'portrait=?,':''}${remark?'remark=?,':''}updatetime=? where id = ?`;
    var now = new Date().getTime();
    var params = [];
    if(name) {
        params.push(name);
    }
    if(portrait) {
        params.push(portrait);
    }
    if(remark) {
        params.push(remark);
    } 
    params.push(now, id);
    db.queryQarams(sql, params,function(err, result){
        if(err) {
            callback(err);
            return;
        }
        //todo
        logger.debug('设置昵称、头像和备注成功', result);
        callback(null);
    })
}
exports.set_info = set_info;

//获取用户
var get_users=function(page, size, callback) {
    var sql=`select * from user where status!=-1 order by updatetime desc ${page && size? 'limit ?,?':''}`;
    var get_count_sql=`select count(*) as count from user where status!=-1`;
    var params = [];
    if(page && size) {
        params = [(page-1)*size, +size];
    }
    var get_user = function() {
        return new Promise(function(resolve,reject){
            db.queryQarams(sql, params, function(err,result) {
                if(err) {
                    reject(err);
                    return;
                }
                resolve(result);
            });
        })
    }
    var get_count = function() {
        return new Promise(function(resolve,reject){
            db.query(get_count_sql, function(err,result){
                if(err){
                    reject(err);
                    return;
                }
                resolve(result[0].count || 0);
            });
        })
    }

    Promise.all([get_user(), get_count()])
    .then(function(data) {
        callback(null, {userlist: data[0], count: data[1]});
    })
    .catch(function(err) {
        logger.error('获取用户列表数据库出错', err);
        callback(err, null);
    });
}
exports.get_users=get_users;

//检查用户是否存在并返回必要信息
var check_user=function(account, password, callback) {
    var sql=`select * from user where (email=? or phone=?) and password=?`;
    db.queryQarams(sql, [account, account, password],function(err,result) {
        if(err) {
            callback(err,null);
            return;
        }
        callback(null,result);
    });
}
exports.check_user=check_user;

var get_user = function(id, callback) {
    var sql = `select * from user where id = ?`;
    db.queryQarams(sql, [id], function(err, result) {
        if(err) {
            callback(err, null);
            return;
        }
        callback(err, result);
    });
}
exports.get_user = get_user;

var table=`
create table if not exists user(
    id int auto_increment primary key,
    name varchar(20) not null,       
    email varchar(20) not null unique,    
    phone varchar(20) not null unique,   
    password varchar(20) not null,      
    portrait varchar(200),    
    status int default 1,            
    level int default 1,              
    remark varchar(100),               
    createtime bigint, 
    updatetime bigint 
)`;
exports.table=table;