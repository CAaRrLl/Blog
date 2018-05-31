var logger = require('../common/logger').logger;
var code = require('../common/const').code;
var addTag = require('../model/tag').add_tag;
var getTag = require('../model/tag').get_tag;
var getEssayTag = require('../model/essay').get_essay_tag;
var getEssay = require('../model/essay').get_essay;
var newEssay = require('../model/essay').new_essay;
var fb = require('./feedback');
var tool = require('../common/tool');
var config = require('../config');
var get_session = require('../middleware/auth').get_session;
var modifyTag = require('../model/tag').modify_tag;
var deleteTag = require('../model/tag').delete_tag;
var deleteEssay = require('../model/essay').essay_drop;
var update_essay = require('../model/essay').update_essay;
var essay_publish = require('../model/essay').essay_publish;
var update_essay_tag = require('../model/essay').update_essay_tag;
var get_publish = require('../model/essay').get_publish;
var get_user = require('../model/user').get_user;

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
        getEssayTag(data.hostid, data.tagid, function(err, result) {
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
                return;
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
    addTag(tag, hostid, function(err, id) {
        if(err) {
            logger.error('添加标签失败', err);
            fb(res, code.dataBaseErr, '数据库出错', {});
            return;
        }
        fb(res, code.success, '', {'id': id});
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
                feedback.taglist = res;
                var params = {
                    'hostid': hostid,
                    'tagid': res[0].id
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
                feedback.taglist = result;
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
    var tagid = req.query.tagid;
    if(!tagid) {
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
        get_essay_tag_list({'hostid': hostid, 'tagid': tagid})
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
    var tagid = req.body.tagid;
    if(!title || !tagid) {
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
    newEssay(essayid, hostid, title, tagid, function(err) {
        if(err) {
            logger.error('新建文章失败', err);
            fb(res, code.dataBaseErr, '数据库出错', {});
            return;
        }
        fb(res, code.success, '', {id: essayid});
    });
}
exports.new_essay = new_essay;

var modify_tag = function(req, res, next) {
    var tagid = req.query.tagid;
    var tag = req.query.tag;
    if(!tagid || !tag) {
        logger.error('修改标签参数错误');
        fb(res, code.paramsErr, '请求参数错误', {});
        return;
    }
    modifyTag(tagid, tag, function(err) {
        if(err) {
            logger.error('修改标签错误', err);
            fb(res, code.dataBaseErr, '数据库出错', {});
            return;
        }
        fb(res, code.success, '', {});
    });
}
exports.modify_tag = modify_tag;

var delete_tag = function(req, res, next) {
    var tagid = req.query.tagid;
    if(!tagid) {
        logger.error('删除标签参数错误');
        fb(res, code.paramsErr, '请求参数错误', {});
        return;
    }
    deleteTag(tagid, function(err) {
        if(err) {
            logger.error('删除标签错误', err);
            fb(res, code.dataBaseErr, '数据库出错', {});
            return;
        }
        fb(res, code.success, '', {});
    });
}
exports.delete_tag = delete_tag;

var delete_essay = function(req, res, next) {
    var essayid = req.query.essayid;
    var session = get_session(req);
    var hostid = session && session.id;
    if(!essayid) {
        logger.error('删除文章参数错误');
        fb(res, code.paramsErr, '请求参数错误', {});
        return;
    }
    logger.debug('删除文章id', essayid);
    if(!hostid) {
        logger.error('用户不存在');
        fb(res, code.noAuth, '没有权限', {});
        return;
    }   
    deleteEssay(essayid, hostid, function(err, result) {
        if(err) {
            logger.error('删除文章错误', err);
            fb(res, code.dataBaseErr, '数据库出错', {});
            return;
        }
        if(result['affectedRows'] == 0) {
            logger.warn('无权限删除文章', err);
            fb(res, code.noAuth, '没有权限', {});
        }else {
            fb(res, code.success, {});
        }
    });  
}
exports.delete_essay = delete_essay;

var save_essay = function(req, res, next) {
    var id = req.body.id;
    var title = req.body.title;
    var text = req.body.text;
    if(!id) {
        logger.error('保存文章参数错误');
        fb(res, code.paramsErr, '请求参数错误', {});
        return;
    }
    var size = text.length;
    update_essay(id, title, text, size, function(err) {
        if(err) {
            logger.error('保存文章数据库出错', err);
            fb(res, code.dataBaseErr, '数据库出错', {});
            return;
        }
        fb(res, code.success, '', {});
    });
}
exports.save_essay = save_essay;

var publish = function(req, res, next) {
    var id = req.query.id; 
    if(!id) {
        logger.error('发布文章参数错误');
        fb(res, code.paramsErr, '请求参数错误', {});
        return;
    }
    essay_publish(id, function(err) {
        if(err) {
            logger.error('发布文章数据库出错', err);
            fb(res, code.dataBaseErr, '数据库出错', {});
            return;
        }
        fb(res, code.success, '', {});
    });
}
exports.publish = publish;

var get_the_essay = function(req, res, next) {
    var id = req.query.id;
    get_essay(id).then(function(result) {
        if(!result[0]) {
            logger.error('文章不存在');
            fb(res, code.essayNoExist, '文章不存在', {});
            return;
        }
        fb(res, code.success, '', result[0]);
    })
    .catch(function(err) {
        logger.error('获取文章数据库出错', err);
        fb(res, code.dataBaseErr, '数据库出错', {});
    });
}
exports.get_the_essay = get_the_essay;

var set_essay_tag = function(req, res, next) {
    var id = req.query.id;
    var tagid = req.query.tagid;
    if(!id || !tagid) {
        logger.error('设置文章标签参数错误');
        fb(res, code.paramsErr, '请求参数错误', {});
        return;
    }
    update_essay_tag(id, tagid, function(err, result) {
        if(err) {
            logger.error('设置文章标签数据库出错', err);
            fb(res, code.dataBaseErr, '数据库出错', {});
            return;
        }
        fb(res, code.success, '', {});
    })
}
exports.set_essay_tag = set_essay_tag;

function get_publish_merge(essayData) {
    var p = new Promise(function(resolve, reject) {
        get_user(essayData.hostid, function(err, result) {
            if(err) {
                reject({feedback:[code.dataBaseErr, '数据库出错', {}], err: err});
                return;
            }
            var name = result[0].name || '';
            var portrait = result[0].portrait || '';
            if(!name) {
                logger.warn('用户名未知');
            }
            essayData.hostname = name;
            essayData.hosthead = portrait;
            var reg = /!\[[\u4e00-\u9fa5\d\w\(\)._]+\]\(([^()]+)\)/i;
            var match = reg.exec(essayData.text);
            if(match && match.length == 2) {
                essayData.imgUrl = match[1];
            }else {
                essayData.imgUrl = '';
            }
            essayData.text = essayData.text.replace(/!\[([\u4e00-\u9fa5\d\w\(\)._]+)\]\([^()]+\)/gi, '$1');
            essayData.text = essayData.text.length > 90? essayData.text.substr(0, 90) + '...': essayData.text;
            resolve(essayData);
        })
    });
    return p;
}

var get_publish_essay = function(req, res, next) {
    var size = req.query.size;
    var pos = req.query.pos;
    var search = req.query.search;
    var self =  req.query.self;
    var tag = req.query.tag;
    search = search || '';
    tag = tag || '';
    if(self) {
        var session = get_session(req);
        self = session && session.id;
        if(!self) {
            logger.warn('会话不存在');
            fb(res, code.sessionNoExist, '会话不存在', {});
            return;
        }
    }
    if(!size || !pos) {
        logger.error('获取发布文章列表参数错误');
        fb(res, code.paramsErr, '请求参数错误', {});
        return;
    }
    get_publish(size, pos, search, self, tag, function(err, result) {
        if(err) {
            logger.error('获取发布文章列表数据库出错', err);
            return;
        }
        if(result.length !== 2) {
            logger.error('获取发布文章列表数据不完整');
            fb(res, code.dataBaseErr, '数据库错误', {});
            return;
        }
        var count = result[1][0].count;
        var essayDataList = result[0];
        if(essayDataList.length <= 0) {
            fb(res, code.success, '', {essays: [], count: count});
            return;
        }
        var promiseAll = [];
        essayDataList.forEach(function(essayData) {
            promiseAll.push(get_publish_merge(essayData));
        });
        Promise.all(promiseAll).then(function(data) {
            logger.debug('获取发布文章最终数据', data);
            fb(res, code.success, '', {essays: data, count: count});
        }).catch(function(err){
            logger.error('获取发布文章最终数据出错', err.err);
            fb(res, ...err[feedback]);
        });
    });
}
exports.get_publish_essay = get_publish_essay;