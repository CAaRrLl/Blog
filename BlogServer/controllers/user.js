var logger = require('../common/logger');
var fb = require('./feedback');
var get_session = require('../middleware/auth').get_session;
var code = require('../common/const').code;

var get_info = function(req, res, next) {
    var info = {};
    var session = get_session(req);
    if(!session) {
        logger.warn('用户会话不存在');
        fb(res, code.sessionNoExist, '会话不存在', {});
    }
    info.name = session.name;
    info.email = session.email;
    info.phone = session.phone;
    info.portrait = session.portrait;
    info.level = session.level;
    info.remark = session.remark;
    info.createtime = session.createtime;
    info.updatetime = session.updatetime;
    fb(res, code.success, '', info);
}

exports.get_info = get_info;

var get_data_sum = function(req, res, next) {
    var datasum = {};
    datasum.follow = 11;
    datasum.follower = 12;
    datasum.essay = 23;
    datasum.wordnum = 1212133;
    datasum.collected = 8;
    fb(res, code.success, '', datasum)
}

exports.get_data_sum = get_data_sum;