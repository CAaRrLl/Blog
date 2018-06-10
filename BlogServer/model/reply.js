var db=require('../common/db');
var logger=require('../common/logger').logger;

var add_reply = function(commentid, sendid, recvid, text, callback) {
    var sql = `insert into reply(commentid, sendid, recvid, text, createtime) values(?, ?, ?, ?, ?)`;
    var now = new Date().getTime();
    db.queryQarams(sql, [commentid, sendid, recvid, text, now], function(err, result) {
        if(err){
            callback(err);
            return;
        }      
        sql = `select max(id) as id from reply`;
        db.query(sql, function(err,result) {
            if(err) {
                callback(err, null);
                return;
            }
            callback(null, result[0].id);
        });
    })
}
exports.add_reply = add_reply;

var del_reply = function(id, sendid, callback) {
    var sql = `delete from reply where id = ? and sendid = ?`;
    db.queryQarams(sql, [id, sendid], function(err, result) {
        if(err){
            callback(err);
            return;
        }      
        callback(null);
    });
}
exports.del_reply = del_reply;

var get_reply = function(commentid, callback) {
    var sql = `select r.id, r.sendid, r.recvid, r.text, r.createtime as time, u.name from reply as r inner join
    user as u where r.commentid = ? and r.sendid = u.id order by r.createtime desc`;
    db.queryQarams(sql, [commentid], function(err, result) {
        if(err){
            callback(err, null);
            return;
        }      
        callback(null, result);
    })
}
exports.get_reply = get_reply;

var table=`
create table if not exists reply(
    id int auto_increment primary key,
    commentid int,
    sendid int,  
    recvid int,                     
    text text,                         
    createtime bigint      ,
    foreign key(commentid) references comment(id) on delete cascade                          
)`;
exports.table=table;