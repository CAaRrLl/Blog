import {environment} from '../../environments/environment';

export const logConfig={
    cache:100,               //缓存日志条数
    counter:60,              //定时器秒
    isOpenCounter:true,      //是否开启计时器定时发送日志
    isOutput:true,           //是否输出到控制台
    levels:{                 //日志等级输出配置
        debug:1,
        info:1,
        warn:1,
        error:1,
        fatal:1
    },
    isSendServer:false       //是否将日志发送达到服务器
}