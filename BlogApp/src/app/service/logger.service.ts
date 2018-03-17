    import {Injectable} from '@angular/core';
    import {logConfig} from '../config/log.config';

    @Injectable()
    export class Logger{
        private cache:number=logConfig.cache;           //最大缓存日志数
        private counter:number=logConfig.counter;          //定时发送日志
        private isOpenCounter:boolean=logConfig.isOpenCounter; //是否开启定时发送
        private isOutput:boolean=logConfig.isOutput;
        private isSendServer:boolean=logConfig.isSendServer;
        private levels:any=logConfig.levels;
        private logs:Log[]=[];
        private logDeal(classTag:string,funcTag:string,detail:any,level:string,push:boolean){
            let timeStamp=new Date().toLocaleString();
            if(this.isOpenCounter) {
                switch(level){
                    case 'debug':
                        if(this.levels.debug==1){
                            console.log('%cDebug','background:green;color:white',
                            timeStamp,'class:',classTag,'func:',funcTag,'detail:',detail);
                        }
                        break;
                    case 'info':
                        if(this.levels.info==1){
                            console.log('%cInfo','background:blue;color:white',
                            timeStamp,'class:',classTag,'func:',funcTag,'detail:',detail);
                        }
                        break;            
                    case 'warn':
                        if(this.levels.warn==1){
                            console.log('%cWarning','background:#cea327;color:white',
                            timeStamp,'class:',classTag,'func:',funcTag,'detail:',detail);
                        }
                        break;            
                    case 'error':
                        if(this.levels.error==1){
                            console.log('%cError','background:firebrick;color:white',
                            timeStamp,'class:',classTag,'func:',funcTag,'detail:',detail);
                        }
                        break;
                    case 'fatal':
                        if(this.levels.fatal==1){
                            console.log('%cFatal','background:red;color:white',
                            timeStamp,'class:',classTag,'func:',funcTag,'detail:',detail);
                        }
                        break;
                }
            }
            if(this.isSendServer){
                let log:Log=new Log(level,timeStamp,classTag,funcTag,detail);
                this.logs.push(log);
                if(this.logs.length==this.cache||push){
                    this.pushCache();
                }
            }
        }
        private cleanCache(){
            this.logs=[];
        }
        pushCache(){
            if(this.logs.length<=0) return;
            //todo
            let timeStamp=new Date().toLocaleString();
            console.log('%cDebug','background:green;color:white',
                            timeStamp,'日志包已经发送给服务器');
            this.cleanCache();
        }
        debug(classTag:string,funcTag:string,detail:any,push?:boolean){
            if(!push) push=false;
            this.logDeal(classTag,funcTag,detail,'debug',push);
        }
        info(classTag:string,funcTag:string,detail:any,push?:boolean){
            if(!push) push=false;
            this.logDeal(classTag,funcTag,detail,'info',push);
        }
        warn(classTag:string,funcTag:string,detail:any,push?:boolean){
            if(!push) push=false;
            this.logDeal(classTag,funcTag,detail,'warn',push);
        }
        error(classTag:string,funcTag:string,detail:any,push?:boolean){
            if(!push) push=false;
            this.logDeal(classTag,funcTag,detail,'error',push);
        }
        fatal(classTag:string,funcTag:string,detail:any,push?:boolean){
            if(!push) push=false;
            this.logDeal(classTag,funcTag,detail,'fatal',push);
        }
        openCounter(counter){
            if(!this.isOpenCounter) return;
            counter=setInterval(()=>{
                this.pushCache();
            },this.counter*1000);
        }
        closeCounter(counter){
            this.isOpenCounter=false;
            clearInterval(counter);
        }
        
    }
    class Log{
        level:string;
        logTime:string;
        classTag:string;
        funcTag:string;
        detail:any;
        constructor(level,logTime,classTag,funcTag:string,detail:any){
            this.level=level;
            this.logTime=logTime;
            this.classTag=classTag;
            this.funcTag=funcTag;
            this.detail=detail;
        }
    }