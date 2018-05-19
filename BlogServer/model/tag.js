var db = require('../common/db');
var logger = require('../common/logger').logger;

//添加标签
var add_tag = function(tag, hostid, callback) {
    var sql = `insert into tag(hostid, tag, updatetime) values(?,?,?)`;
    var now = new Date().getTime();
    db.queryQarams(sql, [hostid, tag, now], function(err,result) {
        if(err) {
            callback(err, null);
            return;
        }
        sql = `select max(id) as id from tag where hostid=?`;
        db.queryQarams(sql, [hostid], function(err,result) {
            if(err) {
                callback(err, null);
                return;
            }
            callback(null, result[0].id);
        });
    });
}
exports.add_tag = add_tag;

//获取某个用户的所有标签，按时间排序
var get_tag = function(hostid,callback) {
    var sql=`select id, tag from tag where hostid=? order by updatetime desc`;
    db.queryQarams(sql, [hostid], function(err, result) {
        if(err) {
            callback(err, null);
            return;
        }
        callback(null, result);
    });
}
exports.get_tag = get_tag;

//删除标签
var delete_tag = function(tagid,callback) {
    var sql=`delete from tag where id = ?`;
    db.queryQarams(sql, [tagid], function(err, result) {
        if(err) {
            callback(err, null);
            return;
        }
        callback(null, result);
    });
}
exports.delete_tag = delete_tag;

//修改标签
var modify_tag = function(tagid,newtag,callback) {
    var sql=`update tag set tag=? where id = ?`;
    db.queryQarams(sql, [newtag,tagid], function(err) {
        if(err) {
            callback(err);
            return;
        }
        callback(null);
    });
}
exports.modify_tag = modify_tag;

var table=`
create table if not exists tag(
    id int auto_increment primary key,
    hostid int,
    tag varchar(100),
    updatetime bigint
)`;
exports.table = table;