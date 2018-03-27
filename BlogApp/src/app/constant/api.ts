import {config} from './enviroment';
const prefix=`${config.server}/api`;

export const api={
    register:`${prefix}/user/register`,      //用户注册post
    userlogin:`${prefix}/user/login`,       //用户登陆          
}