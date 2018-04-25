var crypto = require('crypto');
var tool = {};

var check = function(regExp) {
    return function(type) {
        var pattern = regExp;
        var res = pattern.exec(type);
        if(res == null) {
            return false;
        }
        return true;
    }
}

//签名
var sign = function(val, key) {
    return val + '.' + crypto
    .createHmac('sha256', key)
    .update(val)
    .digest('base64');
}

//检查签名
var unsign = function(val, key) {
    var session_code = get_sessionid(val);
    return sign(session_code, key) === val ? session_code : false;
}

//从cookie中提取sessionid
var get_sessionid = function(val) {
    return val.slice(0, val.lastIndexOf('.'));
}

//生成session口令
var session_code = function(id) {
    return '' + Math.floor(Math.random()*100) + new Date().getTime() + id;
}

//生成文章唯一标识
var get_essay_id = function(time, hostid, key) {
    var id = String(time + hostid);
    return crypto
    .createHmac('sha256', key)
    .update(id)
    .digest('base64');
}

tool.check_email = check(/(^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$)/);
tool.check_phone = check(/(^[0-9]{11}$)/);
tool.check_password = check(/^\S{6,}/);
tool.check_notnull = check(/^\S+/);
tool.sign = sign;
tool.unsign = unsign;
tool.session_code = session_code;
tool.get_sessionid = get_sessionid;
tool.get_essay_id = get_essay_id;

module.exports = tool;