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
}