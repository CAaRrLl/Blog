var collect = require('../model/collection').collect;
var isCollected = require('../model/collection').is_collected;
var cancel_collect = require('../model/collection').cancel_collect;
var get_session = require('../middleware/auth').get_session;
var logger = require('../common/logger').logger;
var code = require('../common/const').code;
var fb = require('./feedback');

var is_collected = function(req, res, next) {
    var id = req.query.id,
        session = get_session(req),
        hostid = session && session.id;

    if(!id) {
        logger.warn('判断是否收藏文章请求参数错误');
        fb(res, code.paramsErr, '请求参数错误', {});
        return;
    }

    if(!hostid) {
        logger.warn('判断是否收藏文章会话不存在');
        fb(res, code.sessionNoExist, '会话不存在', {});
        return;
    }
    isCollected(id, hostid, function(err, count) {
        if(err) {
            logger.error('判断是否收藏文章数据库出错', err);
            fb(res, code.dataBaseErr, '数据库出错', {});
            return;
        }
        fb(res, code.success, '', {iscollected: Number(count) > 0? true: false});
    });
}
exports.is_collected = is_collected;

var collect_essay = function(req, res, next) {
    var id = req.query.id,
        session = get_session(req),
        hostid = session && session.id;

    if(!id) {
        logger.warn('收藏文章请求参数错误');
        fb(res, code.paramsErr, '请求参数错误', {});
        return;
    }

    if(!hostid) {
        logger.warn('收藏文章会话不存在');
        fb(res, code.sessionNoExist, '会话不存在', {});
        return;
    }
    collect(id, hostid, function(err) {
        if(err) {
            logger.error('收藏文章数据库出错', err);
            fb(res, code.dataBaseErr, '数据库出错', {});
            return;
        }
        fb(res, code.success, '', {});
    })
}
exports.collect_essay = collect_essay;

var collect_cancel = function(req, res, next) {
    var id = req.query.id,
        session = get_session(req),
        hostid = session && session.id;

    if(!id) {
        logger.warn('取消收藏文章请求参数错误');
        fb(res, code.paramsErr, '请求参数错误', {});
        return;
    }

    if(!hostid) {
        logger.warn('取消收藏文章会话不存在');
        fb(res, code.sessionNoExist, '会话不存在', {});
        return;
    }

    cancel_collect(id, hostid, function(err) {
        if(err) {
            logger.error('取消收藏文章数据库出错', err);
            fb(res, code.dataBaseErr, '数据库出错', {});
            return;
        }
        fb(res, code.success, '', {});
    });
}
exports.collect_cancel = collect_cancel;