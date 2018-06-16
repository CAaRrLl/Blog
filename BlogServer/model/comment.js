var db=require('../common/db');
var logger=require('../common/logger').logger;

var add_comment = function(essayid, sendid, text, callback) {
    var sql = `insert into comment(essayid, sendid, text, createtime) values(?, ?, ?, ?)`;
    var now = new Date().getTime();
    db.queryQarams(sql, [essayid, sendid, text, now], function(err, result) {
        if(err){
            callback(err);
            return;
        }      
        sql = `select max(id) as id from comment`;
        db.query(sql, function(err,result) {
            if(err) {
                callback(err, null);
                return;
            }
            callback(null, result[0].id);
        });
    })
}
exports.add_comment = add_comment;

var del_comment = function(id, sendid, callback) {
    var sql = `delete from comment where id = ? and sendid = ?`;
    db.queryQarams(sql, [id, sendid], function(err, result) {
        if(err){
            callback(err);
            return;
        }      
        callback(null);
    })
}
exports.del_comment = del_comment;

var get_comment = function(essayid, page, size, callback) {
    var sql = `select c.id, c.sendid, c.text, c.support, c.createtime as time, u.portrait, u.name 
    from comment as c inner join user as u where c.essayid = ? and c.sendid = u.id order by c.createtime desc limit ?, ?`;
    var sql_count = `select count(*) as count from comment where essayid = ?`;
    db.queryQarams(sql, [essayid, size*(page-1), +size], function(err, comments) {
        if(err){
            callback(err, null);
            return;
        }
        db.queryQarams(sql_count, [essayid], function(err, result) {
            if(err) {
                callback(err, null);
                return;
            }
            var count = result[0] && result[0].count;
            if(typeof count !== 'number') {
                callback(new Error('comments count is undefined'), null);
                return;
            }
            callback(null, comments, count);
        });    
    });
}
exports.get_comment = get_comment;

var get_comment_count = function(id, callback) {
    var sql = `select count(*) as count from comment where essayid = ?`;
    db.queryQarams(sql, [id], function(err, result) {
        if(err) {
            callback(err, null);
            return;
        }
        callback(null, result[0].count || 0);
    })
}
exports.get_comment_count = get_comment_count;

var table=`
create table if not exists comment(
    id int auto_increment primary key,
    essayid varchar(100),
    sendid int,
    text text,
    support int default 0,
    createtime bigint             
)`;
exports.table=table;