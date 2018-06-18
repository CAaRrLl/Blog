var logger = require('../common/logger').logger;
var fb = require('./feedback');
var get_session = require('../middleware/auth').get_session;
var code = require('../common/const').code;
var save_user_info = require('../model/user').set_info;
var get_user = require('../model/user').get_user;
var gen_session = require('../middleware/auth').gen_session;
var get_collect_essay_count = require('../model/collection').get_collect_essay_count;
var get_essay_count = require('../model/essay').get_essay_count;
var get_essay_word_num = require('../model/essay').get_sum_word;
var get_user_list = require('../model/user').get_users;
var is_concern = require('../model/concern').is_concern;
var concern_count = require('../model/concern').concern_count;
var concerner_count = require('../model/concern').concerner_count;

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

    var session = get_session(req),
        hostid = session && session.id;
    
    if(!hostid) {
        logger.warn('获取统计信息会话不存在');
        fb(res, code.sessionNoExist, '会话不存在', {});
        return;
    }

    var datasum = {};
    datasum.follow = 0;
    datasum.follower = 0;
    datasum.essay = 0;
    datasum.wordnum = 0;
    datasum.collected = 0;

    Promise.all([get_collect_essay_count(hostid), get_essay_count(hostid), get_essay_word_num(hostid), concern_count(hostid), concerner_count(hostid)])
    .then(function(data) {
        datasum.essay = data[1];
        datasum.collected = data[0];
        datasum.wordnum = data[2];
        datasum.follow = data[3];
        datasum.follower = data[4];
        fb(res, code.success, '', datasum);
    })
    .catch(function(err) {
        logger.error('获取统计信息数据库出错', err);
        fb(res, code.dataBaseErr, '数据库出错', {});
    });
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

function get_user_other_info(userinfo, hostid) {
    var uid = userinfo.id;
    return new Promise(function(resolve, reject) {
        Promise.all([get_collect_essay_count(uid), get_essay_word_num(uid)])
        .then(function(data) {
            userinfo.collectnum = data[0];
            userinfo.wordnum = data[1];
            userinfo.concern = 0;
            if(hostid) {
                is_concern(hostid, uid).then(function(result) {
                    if(result) userinfo.concern = 1;
                    else userinfo.concern = 0;
                    resolve(userinfo);
                }).catch(function(err) {
                    logger.error('获取用户其他信息数据库出错', err);
                    reject(err);
                })
                return;
            }
            resolve(userinfo);
        })
        .catch(function(err) {
            logger.error('获取用户收藏数文章数数据库出错', err);
            reject(err);
        })
    })
}

var get_user_info_list = function(req, res, next) {
    var size = req.query.size,
        page = req.query.page,
        session = get_session(req),
        hostid = session && session.id;

    if(!size || !page) {
        logger.error('获取用户信息列表参数错误');
        fb(res, code.paramsErr, '请求参数错误', {});
        return;
    }
    
    var data = {};
    data.userlist = [];
    data.count = 0;

    get_user_list(page, size, function(err, result) {
        if(err) {
            logger.error('获取用户信息列表数据库错误', err);
            fb(res, code.dataBaseErr, '数据库错误', {});
            return;
        }
        var userlist = result.userlist;
        console.log(userlist);
        if(Object.prototype.toString.call(userlist) !== '[object Array]') {
            logger.warn('获取用户信息列表数据库错误');
            fb(res, code.dataBaseErr, '数据库错误', {});
            return;
        }
        var promiseAll = [];
        userlist.forEach(function(item) {
            var temp = {};
            temp.id = item.id;
            temp.name = item.name;
            temp.portrait = item.portrait;
            promiseAll.push(get_user_other_info(temp, hostid));
        });
        Promise.all(promiseAll).then(function(userInfoArr) {
            data.userlist = userInfoArr || [];
            data.count = result.count || 0;
            fb(res, code.success, '', data);
        }).catch(function(err) {
            logger.error('获取用户信息列表数据库错误', err);
            fb(res, code.dataBaseErr, '数据库错误', {});
        })        
    });

}
exports.get_user_info_list = get_user_info_list;