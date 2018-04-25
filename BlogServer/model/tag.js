var db = require('../common/db');
var logger = require('../common/logger').logger;

//添加标签
var add_tag = function(tag, hostid, callback) {
    var sql = `insert into tag values(?,?,?)`;
    var now = new Date().getTime();
    db.queryQarams(sql, [hostid, tag, now], function(err,result) {
        if(err) {
            callback(err);
            return;
        }
        callback(null);
    });
}
exports.add_tag = add_tag;

//获取某个用户的所有标签，按时间排序
var get_tag = function(hostid,callback) {
    var sql=`select tag from tag where hostid=? order by updatetime desc`;
    db.queryQarams(sql, [hostid], function(err, result) {
        if(err) {
            callback(err, null);
            return;
        }
        callback(null, result);
    });
}
exports.get_tag = get_tag;

//删除收藏
var delete_tag = function(tag,hostid) {
    var sql=`delete from tag where tag = ? and hostid = ?`;
    db.queryQarams(sql, [tag,hostid], function(err, result) {
        if(err) {
            callback(err, null);
            return;
        }
        callback(null, result);
    });
}
exports.delete_tag = delete_tag;

var table=`
create table if not exists tag(
    hostid int,
    tag varchar(100),
    updatetime bigint,
    primary key (hostid,tag)
)`;
exports.table = table;