var db=require('../common/db');
var logger=require('../common/logger').logger;

function admin(){
    return new Promise(function(resolve,reject){
        db.query(require('./admin').table,function(err){
            if(err){
                reject(err);
            }else resolve();
        });
    });
}
function user(){
    return new Promise(function(resolve,reject){
        db.query(require('./user').table,function(err){
            if(err){
                reject(err);
            }else resolve();
        });
    });
}
function essay(){
    return new Promise(function(resolve,reject){
        db.query(require('./essay').table,function(err){
            if(err){
                reject(err);
            }else resolve();
        });
    });
}
function collection(){
    return new Promise(function(resolve,reject){
        db.query(require('./collection').table,function(err){
            if(err){
                reject(err);
            }else resolve();
        });
    });
}
function fileinfo(){
    return new Promise(function(resolve,reject){
        db.query(require('./fileInfo').table,function(err){
            if(err){
                reject(err);
            }else resolve();
        });
    });
}
function frontlog(){
    return new Promise(function(resolve,reject){
        db.query(require('./frontlog').table,function(err){
            if(err){
                reject(err);
            }else resolve();
        });
    });
}
var init_table=function(){
    admin().then(user).then(essay).then(collection).then(fileinfo).then(frontlog)
    .catch(function(err){
        logger.error(err);
    })
}

exports.init_table=init_table;