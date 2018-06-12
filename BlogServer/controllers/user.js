var logger = require('../common/logger').logger;
var fb = require('./feedback');
var get_session = require('../middleware/auth').get_session;
var code = require('../common/const').code;
var save_user_info = require('../model/user').set_info;
var get_user = require('../model/user').get_user;
var gen_session = require('../middleware/auth').gen_session;

var get_info = function(req, res, next) {
    var info = {};
    var session = get_session(req);
    if(!session) {
        logger.warn('用户会话不存在');
        fb(res, code.sessionNoExist, '会话不存在', {});
    }
    info.id = session.id;
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

var save_info = function(req, res, next) {
    var portrait = req.body.portrait,
    name = req.body.name, remark = req.body.remark;
    if(!portrait && !name && !remark) {
        logger.warn('保存个人信息参数错误');
        fb(res, code.paramsErr, '请求参数错误', {});
        return;
    } 
    var session = get_session(req);
    var hostid = session && session.id;
    if(!hostid) {
        fb(res, code.sessionNoExist, '会话不存在', {});
        return;
    }
    save_user_info(hostid, name, portrait, remark, function(err) {
        if(err) {
            logger.error('保存个人信息数据库错误', err);
            fb(res, code.dataBaseErr, '数据库错误', {});
            return;
        }
        get_user(hostid, function(err, result) {
            if(err) {
                logger.error('更新个人信息数据库错误', err);
                fb(res, code.dataBaseErr, '数据库错误', {});
                return;
            }
            var session = result[0];
            if(!session) {
                logger.error('用户不存在');
                fb(res, code.userNoExist, '用户不存在', {});
                return;
            }
            gen_session(session.id, session, res, req);
            fb(res, code.success, '', {});
        });
    });
}

exports.save_info = save_info;