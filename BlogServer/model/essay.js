var db=require('../common/db');
var logger=require('../common/logger').logger;

//新建文章
var new_essay=function(id,hostid,title,callback){
    var sql=`insert into essay(id,hostid,title,createtime,updatetime) values(?,?,?,?,?)`;
    var now=new Date();
    db.queryQarams(sql,[id,hostid,title,now,now],function(err,result){
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
var update_essay=function(id,title,essay,size,remark,callback){
    var sql=`update essay set title=?,text=?,size=?,remark=? where id=?`;
    var now=new Date();
    db.queryQarams(sql,[title,essay,size,remark,id],function(err,result){
        if(err){
            callback(err);
            return;
        }
        logger.debug(result);
        callback(null);
    })
}
exports.update_essay=update_essay;

//发布文章
var essay_publish=function(id,callback){
    var sql=`update essay set status=1 where id =id`;
    var now=new Date();
    db.queryQarams(sql,[id],function(err,result,fields){
        if(err){
            callback(err);
            return;
        }
        logger.debug(result);        
        callback(null);
    })
}
exports.essay_publish=essay_publish;

//删除文章
var essay_drop=function(id,callback){
    var sql=`update essay set status=-1 where id =id`;
    var now=new Date();
    db.queryQarams(sql,[id],function(err,result,fields){
        if(err){
            callback(err);
            return;
        }
        logger.debug(result);        
        callback(null);
    })
}
exports.essay_publish=essay_publish;

//获取已发布文章
var get_publish=function(size,pos,search,callback){
    var get_essay_sql=`select * from essay where text like '%?%' or title like '%?%' and status=1 order by updatetime limit ?,?`;
    var get_count_sql=`select count(*) from essay where text like '%?%' or title like '%?%' and status=1`;
    var get_essay=function(){
        return new Promise(function(resolve,reject){
            db.queryQarams(get_essay_sql,[search,search,pos-1,size],
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
            db.queryQarams(get_count_sql,[search,search],
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

//获取我的文章列表,type=1已发布|type=0草稿
var get_myessay=function(hostid,pos,size,type,callback){
    var get_myessay_sql=`select * from essay where hostid=? and status=? order by updatetime limit ?,?`;
    var get_count_sql=`select count(*) from essay where hostid=? and status=?`;
    var get_myessay=function(){
        return new Promise(function(resolve,reject){
            db.queryQarams(get_myessay_sql,[hostid,type,pos-1,size],
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

var table=`
create table if not exists essay(
    id varchar(50) primary key,     
    hostid int not null,
    title varchar(50) not null,  
    text text,       
    size int,       
    readtime int default 0,         
    status int default 0,           
    remark varchar(100),    
    createtime datetime,          
    updatetime datetime             
)`;
exports.table=table;