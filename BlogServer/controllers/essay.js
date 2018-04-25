var logger = require('../common/logger').logger;
var code = require('../common/const').code;
var auth = require('../middleware/auth').get_session;
var addTag = require('../model/tag').add_tag;
var getTag = require('../model/tag').get_tag;
var getEssayTag = require('../model/essay').get_essay_tag;
var getEssay = require('../model/essay').get_essay;
var newEssay = require('../model/essay').new_essay;
var fb = require('./feedback');
var tool = require('../common/tool');
var config = require('../config');
var get_session = require('../middleware/auth').get_session;


function get_tag_list(hostid) {
    if(!hostid) return;
    return new Promise(function(resolve, reject) {
        getTag(hostid, function(err, result) {
            if(err) {
                reject(err);
                return;
            }
            resolve(result);        
        });
    })
}

function get_essay_tag_list(data) {
    if(!data) return;
    return new Promise(function(resolve, reject) {
        getEssayTag(data.hostid, data.tag, function(err, result) {
            if(err) {
                reject(err);
            }
            resolve(result);
        });
    })
}

function get_essay(id) {
    if(!id) return;
    return new Promise(function(resolve, reject) {
        getEssay(id, function(err, result) {
            if(err) {
                reject(err);
            }
            resolve(result);
        });
    })
}

var new_tag = function(req, res, next) {
    var tag = req.query.tag;
    if(!tag) {
        logger.warn('新建标签参数错误');
        fb(res, code.paramsErr, '标签名不合法', {});
        return;
    }
    var session = get_session(req);
    if(!session) {
        logger.error('essayControllers', 'new tag', 'session not exist');
        fb(res, code.sessionNoExist, '会话不存在', {});
        return;
    }
    var hostid = session.id;
    if(!hostid) {
        logger.error('essayControllers', 'new tag', 'hostid not exist');
        fb(res, code.sessionNoExist, '会话不存在', {});
        return;
    }
    logger.debug('当前用户id:' + hostid);
    addTag(tag, hostid, function(err) {
        if(err) {
            logger.error('添加标签失败', err);
            fb(res, code.dataBaseErr, '数据库出错', {});
            return;
        }
        fb(res, code.success, '', {});
    });
}
exports.new_tag = new_tag;

var get_tag = function(req, res, next) {
    var attach = req.query.attach;
    var feedback = {};
    var session = get_session(req);
    if(!session) {
        logger.error('essayControllers', 'get tag', 'session not exist');
        fb(res, code.sessionNoExist, '会话不存在', {});
        return;
    }
    var hostid = session.id;
    if(!hostid) {
        logger.error('essayControllers', 'get tag', 'hostid not exist');
        fb(res, code.sessionNoExist, '会话不存在', {});
        return;
    }
    logger.debug('当前用户id:' + hostid);
    if(attach == 1) {
        //todo
        feedback.taglist = [];
        feedback.essaytaglist = [];
        feedback.firstessay = {};
        get_tag_list(hostid)
        .then(function(res) {
            if(!res) return;
            if(res.length > 0) {
                res.forEach(e => {
                    feedback.taglist.push(e.tag);
                });
                var params = {
                    'hostid': hostid,
                    'tag': res[0].tag
                }
                return params;
            }
        })
        .then(get_essay_tag_list)
        .then(function(res) {
            if(!res) return;
            if(res.length > 0) {
                feedback.essaytaglist = res;
                return res[0].id;
            }
        })
        .then(get_essay)
        .then(function(result) {
            if(result && result.length > 0) {
                feedback.firstessay = result[0];
            }
            fb(res, code.success, '', feedback);
        })
        .catch(function(err) {
            logger.error('获取标签和标签附带信息失败',err);
            fb(res, code.dataBaseErr, '数据库出错', {});
        });
    }else {
        get_tag_list(hostid).then(function(result) {
            logger.debug('获取标签为',result);
            feedback.taglist = [];
            if(result.length > 0) {
                result.forEach(e => {
                    feedback.taglist.push(e.tag);
                });
            }
            fb(res, code.success, '', feedback);
        }).catch(function(err) {
            logger.error('获取标签失败',err);
            fb(res, code.dataBaseErr, '数据库出错', {});
        });
    }
    
}
exports.get_tag = get_tag;

var get_essay_tag = function(req, res, next) {
    var tag = req.query.tag;
    if(!tag) {
        logger.warn('获取文章标题信息参数错误');
        fb(res, code.paramsErr, '请求参数错误', {});
        return;
    }
    var session = get_session(req);
    if(!session) {
        logger.error('essayControllers,', 'get essay tag,', 'session not exist');
        fb(res, code.sessionNoExist, '会话不存在', {});
        return;
    }
    var hostid = session.id;
    if(!hostid) {
        logger.error('essayControllers,', 'get essay tag,', 'hostid not exist');
        fb(res, code.sessionNoExist, '会话不存在', {});
        return;
    }
    var attach = req.query.attach;
    if(attach == 1) {
        var feedback = {};
        feedback.essaytaglist = [];
        feedback.firstessay = {};
        //todo
        get_essay_tag_list({'hostid': hostid, 'tag': tag})
        .then(function(res) {
            if(!res) return;
            if(res.length > 0) {
                feedback.essaytaglist = res;                
                return res[0].id;
            }
        })
        .then(get_essay)
        .then(function(result) {
            if(result && result.length > 0) {
                feedback.firstessay = result[0];
            }
            fb(res, code.success, '', feedback);
        })
        .catch(function(err) {
            logger.error('获取文章标题信息及其附带信息失败',err);
            fb(res, code.dataBaseErr, '数据库出错', {});
        })
    }else {
        get_essay_tag_list(hostid, tag)
        .then(function(result) {
            logger.debug('获取文章标题信息',result);
            fb(res, code.success, '', {essaytaglist: result});
        })
        .catch(function(err) {
            logger.error('获取文章标题信息失败',err);
            fb(res, code.dataBaseErr, '数据库出错', {});
        })
    }
}
exports.get_essay_tag = get_essay_tag;

var new_essay = function(req, res, next) {
    var title = req.body.title;
    var tag = req.body.tag;
    if(!title || !tag) {
        logger.warn('新建文章参数错误');
        fb(res, code.paramsErr, '请求参数错误', {});
        return;
    }
    var hostid = get_session(req).id;
    if(!hostid) {
        logger.error('essayControllers,', 'new_essay,', 'hostid not exist');
        fb(res, code.sessionNoExist, '会话不存在', {});
        return;
    }
    var time = new Date().getTime();
    var essayid = tool.get_essay_id(time, hostid, config.file_key);
    newEssay(essayid, hostid, title, tag, function(err) {
        if(err) {
            logger.error('新建文章失败', err);
            fb(res, code.dataBaseErr, '数据库出错', {});
            return;
        }
        fb(res, code.success, '', {id: essayid});
    });
}
exports.new_essay = new_essay;