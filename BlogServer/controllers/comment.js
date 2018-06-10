var logger = require('../common/logger').logger;
var code = require('../common/const').code;
var fb = require('./feedback');
var get_comment = require('../model/comment').get_comment;
var get_reply = require('../model/reply').get_reply;
var addComment = require('../model/comment').add_comment;
var delComment = require('../model/comment').del_comment;
var addReply = require('../model/reply').add_reply;
var delReply = require('../model/reply').del_reply;
var get_session = require('../middleware/auth').get_session;

var get_reply_p = function(commentid) {
    return new Promise(function(resolve, reject) {
        get_reply(commentid, function(err, result) {
            if(err) {
                reject(err);
                return;
            }
            resolve(result);
        });
    });
}

var get_comments = function(req, res, next) {
    var id = req.query.id,
        page = Number(req.query.page),
        size = Number(req.query.size);
    if(!id || !page || !size) {
        logger.warn('获取评论参数错误');
        fb(res, code.paramsErr, '请求参数错误', {});
        return;
    }
    get_comment(id, page, size, function(err, commentArr, count) {
        if(err) {
            logger.error('获取评论数据库出错', err);
            fb(res, code.dataBaseErr, '数据库出错', {});
            return;
        }
        if(commentArr.length <= 0) {
            fb(res, code.success, '', {});
            return;
        }
        var promiseAll = [];
        commentArr.forEach(function(comment) {
            promiseAll.push(get_reply_p(comment.id));
        });
        Promise.all(promiseAll).then(function(replyArr) {
            var data = {};
            replyArr.forEach(function(reply, index) {
                commentArr[index].replys = reply;
            });
            data.comments = commentArr;
            data.count = count;
            logger.debug('反馈的评论数据', data);
            fb(res, code.success, '', data);
        }).catch(function(err) {
            logger.error('获取评论数据库出错', err);
            fb(res, code.dataBaseErr, '数据库出错', {});
        });    
    });
}
exports.get_comments = get_comments;

var add_comment = function(req, res, next) {
    var essayid = req.body.essayid;
        text = req.body.text,
        session = get_session(req),
        sendid = session && session.id;

    if(!sendid) {
        logger.warn('会话不存在');
        fb(res, code.sessionNoExist, '会话不存在', {});
        return;
    }

    if(!essayid || !text) {
        logger.warn('添加留言参数不合法');
        fb(res, code.paramsErr, '请求参数错误', {});
        return;
    }
    addComment(essayid, sendid, text, function(err, commentid) {
        if(err) {
            logger.error('添加留言出错', err);
            fb(res, code.dataBaseErr, '数据库出错', {});
            return;
        }
        fb(res, code.success, '', {id: commentid});
    });
}
exports.add_comment = add_comment;

var add_reply = function(req, res, next) {
    var commentid = req.body.commentid;
        text = req.body.text,
        recvid = req.body.recvid,
        session = get_session(req),
        sendid = session && session.id;

    if(!sendid) {
        logger.warn('会话不存在');
        fb(res, code.sessionNoExist, '会话不存在', {});
        return;
    }

    if(!commentid || !text || !recvid) {
        logger.warn('添加回复参数不合法');
        fb(res, code.paramsErr, '请求参数错误', {});
        return;
    }
    addReply(commentid, sendid, recvid, text, function(err, replyid) {
        if(err) {
            logger.error('回复出错', err);
            fb(res, code.dataBaseErr, '数据库出错', {});
            return;
        }
        fb(res, code.success, '', {id: replyid});
    });
}
exports.add_reply = add_reply;

var del_comment = function(req, res, next) {
    var id = req.body.id;
        session = get_session(req),
        sendid = session && session.id; 

    if(!sendid) {
        logger.warn('会话不存在');
        fb(res, code.sessionNoExist, '会话不存在', {});
        return;
    }

    if(!id) {
        logger.warn('删除留言参数不合法');
        fb(res, code.paramsErr, '请求参数错误', {});
        return;
    }

    delComment(id, sendid, function(err) {
        if(err) {
            logger.error('删除留言出错', err);
            fb(res, code.dataBaseErr, '数据库出错', {});
            return;
        }
        fb(res, code.success, '', {});
    });
}
exports.del_comment = del_comment;

var del_reply = function(req, res, next) {
    var id = req.body.id;
        session = get_session(req),
        sendid = session && session.id; 
    
    if(!sendid) {
        logger.warn('会话不存在');
        fb(res, code.sessionNoExist, '会话不存在', {});
        return;
    }
    
    if(!id) {
        logger.warn('删除回复参数不合法');
        fb(res, code.paramsErr, '请求参数错误', {});
        return;
    }

    delReply(id, sendid, function(err) {
        if(err) {
            logger.error('删除回复出错', err);
            fb(res, code.dataBaseErr, '数据库出错', {});
            return;
        }
        fb(res, code.success, '', {});
    });
}
exports.del_reply = del_reply;