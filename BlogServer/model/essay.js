var db=require('../common/db');
var logger=require('../common/logger').logger;

//新建文章
var new_essay=function(id,hostid,title,tag,callback){
    var sql=`insert into essay(id,hostid,title,tag,createtime,updatetime) values(?,?,?,?,?,?)`;
    var now=new Date().getTime();
    db.queryQarams(sql,[id,hostid,title,tag,now,now],function(err,result){
        if(err){
            callback(err);
            return;
        }
        logger.debug(result);
        callback(null);
    })
}
exports.new_essay=new_essay;

//更新文章
var update_essay=function(id,title,essay,size,callback){
    var sql=`update essay set title=?,text=?,size=? where id=?`;
    var now=new Date().getTime();
    db.queryQarams(sql,[title,essay,size,id],function(err,result){
        if(err){
            callback(err, null);
            return;
        }
        logger.debug(result);
        callback(null, result);
    })
}
exports.update_essay=update_essay;

//设置文章标签
var update_essay_tag=function(id, tagid, callback){
    var sql=`update essay set tag=? where id=?`;
    db.queryQarams(sql,[tagid, id],function(err,result){
        if(err){
            callback(err, null);
            return;
        }
        logger.debug(result);
        callback(null, result);
    })
}
exports.update_essay_tag=update_essay_tag;

//发布文章
var essay_publish=function(id,callback){
    var sql=`update essay set status=1 where id =?`;
    var now=new Date().getTime();
    db.queryQarams(sql,[id],function(err,result,fields){
        if(err){
            callback(err);
            return;
        }
        logger.debug('发布文章', result);        
        callback(null);
    })
}
exports.essay_publish=essay_publish;

//删除文章 todo 事务
var essay_drop=function(id, hostid, callback){
    var sql=`update essay set status=-1 where id=? and hostid=?`;
    var now=new Date().getTime();
    db.queryQarams(sql,[id, hostid],function(err,result,fields){
        if(err){
            callback(err, null);
            return;
        }
        logger.debug(result);        
        callback(null, result);
    })
}
exports.essay_drop=essay_drop;

//获取已发布文章
var get_publish=function(size, pos, search, hostid, tag, callback){

    var get_essay_sql=
    `select * from essay where ${search?'text like ? or title like ? and':''} 
    ${hostid?'hostid=? and': ''} ${tag?'tag=? and': ''} status=1 order by updatetime desc limit ?,?`;

    var get_count_sql=
    `select count(*) as count from essay where ${search?'text like ? or title like ? and':''}
    ${hostid?'hostid=? and': ''} ${tag?'tag=? and': ''} status=1`;

    search = search? '%' + search + '%' : '';

    var get_essay=function(){
        return new Promise(function(resolve,reject){
            var params = [];
            if(search) {
                params.push(search, search);
            }
            if(hostid) {
                params.push(hostid);
            }
            if(tag) {
                params.push(tag);
            }
            params.push(size*(pos-1), +size);
            db.queryQarams(get_essay_sql, params,
                function(err,result,fields){
                    if(err){
                        reject(err);
                    }
                    resolve(result);
                });
        })
    }
    var get_count=function(){
        return new Promise(function(resolve,reject){
            var params = [];
            if(search) {
                params.push(search, search);
            }
            if(hostid) {
                params.push(hostid);
            }
            if(tag) {
                params.push(tag);
            }
            db.queryQarams(get_count_sql, params,
                function(err,result,fields){
                    if(err){
                        reject(err);
                    }
                    resolve(result);
                });
        })
    }
    Promise.all([get_essay(),get_count()])
    .then(function(result){
        callback(null,result);
    }).catch(function(err){
        callback(err,null);
    });
}
exports.get_publish=get_publish;

//获取文章
var get_essay=function(id,callback){
    var sql=`select * from essay where id=?`;
    db.queryQarams(sql,[id],function(err,result,fields){
        if(err){
            callback(err,null);
            return;
        }
        callback(null,result);
    })
}
exports.get_essay=get_essay;

//获取用户某个标签下的文章
var get_essay_tag=function(hostid,tag,callback){
    var sql=`select id, title, status from essay where hostid=? and tag=? and status!=-1 order by updatetime desc`;
    db.queryQarams(sql,[hostid, tag],function(err,result,fields){
        if(err){
            callback(err,null);
            return;
        }
        callback(null,result);
    })
}
exports.get_essay_tag=get_essay_tag;

//获取我的文章列表,type=1已发布|type=0草稿
var get_myessay=function(hostid,pos,size,type,callback){
    var get_myessay_sql=`select * from essay where hostid=? and status=? order by updatetime limit ?,?`;
    var get_count_sql=`select count(*) as count from essay where hostid=? and status=?`;
    var get_myessay=function(){
        return new Promise(function(resolve,reject){
            db.queryQarams(get_myessay_sql,[hostid,type,pos-1,Number(size)],
                function(err,result,fields){
                    if(err){
                        reject(err);
                    }
                    resolve(result);
                });
        })
    }
    var get_count=function(){
        return new Promise(function(resolve,reject){
            db.queryQarams(get_count_sql,[hostid,type],
                function(err,result,fields){
                    if(err){
                        reject(err);
                        return;
                    }
                    resolve(result);
                });
        })
    }
    Promise.all([get_myessay(),get_count()])
    .then(function(result){
        callback(null,result);
    }).catch(function(err){
        callback(err,null);
    });
}
exports.get_myessay=get_myessay;

var get_essay_count = function(hostid) {
    var sql = `select count(*) as count from essay ${hostid? 'where hostid = ?':''}`;
    
    return new Promise(function(resolve, reject) {
        var params = [];
        if(hostid) params.push(hostid);
        db.queryQarams(sql, params, function(err, result) {
            if(err){
                reject(err);
            }
            resolve(result[0].count || 0);
        });
    });
}
exports.get_essay_count = get_essay_count;

var add_readtime = function(essayid, callback) {
    var sql =  `update essay set readtime=readtime+1 where id = ?`;
    db.queryQarams(sql, [essayid], function(err, result) {
        if(err) {
            callback(err);
            return;    
        }
        callback(null);
    });
}
exports.add_readtime = add_readtime;

var get_sum_word = function(hostid) {
    var sql = `select sum(size) as sum from essay where hostid = ?`;
    return new Promise(function(resolve, reject) {
        db.queryQarams(sql, [hostid], function(err, result) {
            if(err) {
                reject(err);
                return;
            }
            resolve(result[0].sum || 0);
        });
    });
}
exports.get_sum_word = get_sum_word;

var table=`
create table if not exists essay(
    id varchar(100) primary key,     
    hostid int not null,
    title varchar(50) not null,  
    text text,       
    size int,       
    readtime int default 0,         
    status int default 0,    
    tag int,        
    remark varchar(100),    
    createtime bigint,          
    updatetime bigint             
)`;
exports.table=table;