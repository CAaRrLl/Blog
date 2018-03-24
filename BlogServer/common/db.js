var db={};
var mysql = require('mysql');
var logger = require('./logger').logger;
var config = require('../config');

var pool = mysql.createPool(config.database);

db.query=function(sql,callback){
    if(!sql){
        logger.warn('sql语句不存在');
        callback();
        return;
    }
    pool.query(sql,function(err,results,fields){
        if(err){
            callback(err,null);
            return;
        }
        callback(null,results,fields);
    })
}

db.queryQarams=function(sql,values,callback){
    if(!sql){
        logger.warn('sql语句不存在');
        callback();
        return;
    }
    pool.query(sql,values,function(err,results,fields){
        if(err){
            callback(err,null);
            return;
        }
        callback(null,results,fields);
    })
}

module.exports=db;