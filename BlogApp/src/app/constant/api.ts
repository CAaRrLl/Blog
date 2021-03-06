import {config} from './enviroment';
const prefix=`${config.server}/api`;

export const api={
    register:`${prefix}/user/register`,     //用户注册post
    userlogin:`${prefix}/user/login`,       //用户登陆       
    layout: `${prefix}/layout`,             //注销   
    newtag: `${prefix}/essay/newtag`,       //新建标签
    newEssay: `${prefix}/essay/new`,        //新建文章
    getTag: `${prefix}/essay/tag`,          //获取标签   
    getEssayTag: `${prefix}/essay/essaytag`, //获取文章标签
    modifyTag: `${prefix}/essay/modifytag`, //修改标签
    deleteTag: `${prefix}/essay/deletetag`, //删除标签
    deleteEssay: `${prefix}/essay/delete`,   //删除文章
    uploadFile: `${prefix}/file/upload`,    //提交文件
    getFile: `${prefix}/file/get`,    //获取静态文件
    saveEssay: `${prefix}/essay/save`,   //保存文章
    publish: `${prefix}/essay/publish`,   //发布文章
    getEssay: `${prefix}/essay/getmarkdown`, //获取文章
    setEssayTag: `${prefix}/essay/settag`,  //修改文章标签
    getpublish: `${prefix}/essay/getpublish`, //获取已发布文章列表
    getInfo: `${prefix}/user/info`,      //获取用户信息
    getDataSum: `${prefix}/user/datasum`,   //数据统计（粉丝、关注、文章、字数、喜欢数）
    saveInfo: `${prefix}/user/info/save`,   //保存个人信息
    addComment: `${prefix}/user/comment`,   //添加留言
    addReply: `${prefix}/user/reply`,        //添加回复
    delComment: `${prefix}/user/comment/del`,   //删除留言
    delReply: `${prefix}/user/reply/del`,   //删除回复
    getComments: `${prefix}/essay/comments`, //获取文章下的评论
    readEssay: `${prefix}/essay/read`,        //读一次文章
    collectEssay: `${prefix}/essay/collection`, //收藏文章
    isCollected: `${prefix}/essay/iscollected`, //判断用户是否收藏了该文章
    collectCancal: `${prefix}/essay/collection/cancel`, //取消收藏
    concern: `${prefix}/concern/confirm`,    //关注用户
    unconcern: `${prefix}/concern/cancel`,   //取消关注
    getUserInfoList: `${prefix}/user/infolist`,   //获取用户信息列表,用于关注
}