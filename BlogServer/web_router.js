var express=require('express');
var path=require('path');
var config=require('./config');

var router=express.Router();

router.all('/*',function(req,res,next){
    //访问不到资源的页面返回首页
    res.status(200).sendFile(path.join(config.template_dir,'/index.html'));
});

module.exports=router;