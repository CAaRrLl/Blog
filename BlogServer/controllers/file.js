var logger = require('../common/logger').logger;
var code = require('../common/const').code;
var add_file = require('../model/fileInfo').add_fileinfo;
var check_file = require('../model/fileInfo').check_fileinfo;
var tool = require('../common/tool')
var config = require('../config');
var fs =require('fs');
var fb = require('./feedback');

function saveFile(file) {
    return new Promise(function(resolve, reject) {
        fs.readFile(file.path, function(err, buf) {
            if(err) {
                logger.error('读取文件失败', err);
                reject(err);
                return;
            }
            if(!buf || buf.length <= 0) {
                logger.error('文件流为空');
                reject(err);
                return;
            }
            var suffix = file.name.split('.') && file.name.split('.')[1];
            var filesha256 = tool.get_file_sha256(buf);

            //判断文件是否存在
            check_file(filesha256, function(err, isExist) {
                if(err) {
                    logger.error('检查文件信息是否存在出错', err);
                    reject(err);
                    return;
                }
                if(!isExist) {
                    var path = config.file_dir + '/' + filesha256 + '.' + suffix;
                    var readStream = fs.ReadStream(file.path);
                    var writeStream = fs.WriteStream(path);
                    readStream.pipe(writeStream);
                    readStream.on('end', function() {
                        fs.unlink(file.path, function(err) {
                            if(err) {
                                logger.error('删除缓存失败', err);
                                return;
                            }
                        })
                    })
                }
                resolve({id: filesha256, name: file.name});
            });
        });
    });
}

var upload_file = function(req, res, next) {
    if(!req.files) {
        fb(res, code.paramsErr, '请求参数错误', {});
    }
    var files = req.files.key;
    if(!files) {
        fb(res, code.paramsErr, '请求参数错误', {});
        return;
    }
    logger.debug('上传文件', files);
    if(!(files instanceof Array)) {
        files = [files];
    }
    var saveFiles = [];
    files.forEach(function(file) {
        if(!file) {
            logger.error('文件不存在');
            return;
        }
        if(!file.path) {
            logger.error('文件缓存路径不存在');
            return;
        }
        if(!file.name) {
            logger.warn('文件名不存在');
            return;
        }
        if(file.size > config.file_size_limit) {
            logger.warn('文件超过限制大小,不予上传');
            return;
        }
        saveFiles.push(saveFile(file));
    });
    Promise.all(saveFiles).then(function(result) {
        logger.debug('上传文件结果反馈', result);
        fb(res, code.success, '', {files: result});
        result.forEach(function(file) {
            check_file(file.id, function(err, isExist) {
                if(err) {
                    logger.error('检查文件信息是否存在出错', err);
                    return;
                }
                if(isExist) return;
                add_file(file.id, file.name, '', function(err) {
                    if(err) {
                        logger.error('文件信息保存数据库失败', err);
                        return;
                    }
                });
            });
        });
    }).catch(function(err) {
        logger.error('上传文件失败', err);
        fb(res, code.paramsErr, '请求参数错误', {});
    });
}
exports.upload_file = upload_file;

