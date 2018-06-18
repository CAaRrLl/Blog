var db=require('../common/db');
var logger=require('../common/logger').logger;

var is_concern = function(hostid, concernid) {
    var sql = `select count(*) as count from concern where hostid=? and concernid=?`;
    return new Promise(function(resolve, reject) {
        db.queryQarams(sql, [hostid, concernid], function(err, result) {
            if(err) {
                reject(err);
                return;
            }
            if(result[0].count == 1) {
                resolve(true);
                return;
            }
            resolve(false);
        })
    })
}
exports.is_concern = is_concern;

var concern = function(hostid, concernid) {
    var sql = `insert into concern values(?,?)`;

    return new Promise(function(resolve, reject) {
        db.queryQarams(sql, [hostid, concernid], function(err, result) {
            if(err) {
                reject(err);
                return;
            }
            resolve();
        });
    })
}
exports.concern = concern;

var unconcern = function(hostid, concernid) {
    var sql = `delete from concern where hostid=? and concernid=?`;

    return new Promise(function(resolve, reject) {
        db.queryQarams(sql, [hostid, concernid], function(err, result) {
            if(err) {
                reject(err);
                return;
            }
            resolve();
        });
    })
}
exports.unconcern = unconcern;

var concerner_count = function(uid) {
    var sql = `select count(*) as count from concern where concernid=?`;

    return new Promise(function(resolve, reject) {
        db.queryQarams(sql, [uid], function(err, result) {
            if(err) {
                reject(err);
                return;
            }
            resolve(result[0].count || 0);
        });
    });
}
exports.concerner_count = concerner_count;

var concern_count = function(uid) {
    var sql = `select count(*) as count from concern where hostid=?`;

    return new Promise(function(resolve, reject) {
        db.queryQarams(sql, [uid], function(err, result) {
            if(err) {
                reject(err);
                return;
            }
            resolve(result[0].count || 0);
        })
    })
}
exports.concern_count = concern_count;

var table=`
create table if not exists concern(
    hostid int,
    concernid int,
    primary key (hostid,concernid)
)`;
exports.table = table;