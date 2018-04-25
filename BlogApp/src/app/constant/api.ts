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
}