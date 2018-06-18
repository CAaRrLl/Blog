var db = require('../common/db');
var path =  require('path');
var logger = require('../common/logger').logger;

function base(table_name) {
    var pathname = './' + table_name;
    return function(){
        return new Promise(function(resolve, reject) {
            db.query(require(pathname).table, function(err) {
                if(err){
                    reject(err);
                }else resolve();
            });
        })
    }
}

var admin = base('admin');
var user = base('user');
var essay = base('essay');
var tag = base('tag');
var collection = base('collection');
var concern = base('concern');
var comment = base('comment');
var reply = base('reply');
var fileinfo = base('fileinfo');
var frontlog = base('frontlog');

var init_table = function() {
    admin().then(user).then(essay).then(tag).then(collection)
    .then(concern).then(comment).then(reply).then(fileinfo).then(frontlog)
    .catch(function(err) {
        logger.error(err);
    });
}

exports.init_table=init_table;