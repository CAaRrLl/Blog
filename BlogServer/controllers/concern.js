var logger = require('../common/logger').logger;
var code = require('../common/const').code;
var fb = require('./feedback');
var get_session = require('../middleware/auth').get_session;
var _concern = require('../model/concern').concern;
var _unconcern = require('../model/concern').unconcern;

var concern = function(req, res, next) {
    var id = req.body.id;
        session = get_session(req),
        hostid = session && session.id;
    
    if(!hostid) {
        logger.warn('关注用户会话不存在');
        fb(res, code.sessionNoExist, '会话不存在', {});
        return;
    }

    if(!id) {
        logger.warn('关注用户请求参数错误');
        fb(res, code.paramsErr, '请求参数错误', {});
        return;
    }

    _concern(hostid, id).then(function() {
        fb(res, code.success, '', {});
    }).catch(function(err) {
        logger.error('关注用户数据库出错', err);
        fb(res, code.dataBaseErr, '数据库出错', {});
    })
}
exports.concern = concern;

var unconcern = function(req, res, next) {
    var id = req.body.id;
        session = get_session(req),
        hostid = session && session.id;
    
    if(!hostid) {
        logger.warn('取消关注用户会话不存在');
        fb(res, code.sessionNoExist, '会话不存在', {});
        return;
    }

    if(!id) {
        logger.warn('取消关注用户请求参数错误');
        fb(res, code.paramsErr, '请求参数错误', {});
        return;
    }

    _unconcern(hostid, id).then(function() {
        fb(res, code.success, '', {});
    }).catch(function(err) {
        logger.error('取消关注用户数据库出错', err);
        fb(res, code.dataBaseErr, '数据库出错', {});
    })
}
exports.unconcern = unconcern;