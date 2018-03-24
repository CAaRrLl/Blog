import {Component, ElementRef, ViewChild} from '@angular/core';
import { InputJson } from '../../../component/component.interface';
import { Logger } from '../../../service/logger.service';

@Component({
    selector:'app-sign-in',
    templateUrl:'./sign.in.up.component.html',
    styleUrls:['./sign.in.up.component.scss']
})

export class SignInUpComponent{
    signInView:InputJson=new InputJson();
    signUpView:InputJson=new InputJson();
    currentTab:boolean=true;  //true:登陆 false:注册
    currentTabTip:string='社交帐号登录';
    isValid:boolean;
    signInTabClass={
        'tab-active':this.currentTab,
        'tab':!this.currentTab
    }
    signUpTabClass={
        'tab-active':!this.currentTab,
        'tab':this.currentTab
    }
    constructor(private log:Logger){
        this.signInView.frame.push({placeholder:'手机号或邮箱号',type:'text',icon:'user',content:'',openCheck: {
            regExp:/(^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$)|([0-9]{11})/,
            errorTip:'帐号格式不正确！',
            isValid:false
        }});
        this.signInView.frame.push({placeholder:'密码',type:'password',icon:'lock',content:'',openCheck: {
            regExp:/^\S{6,}/,
            errorTip:'请输入密码(6位以上)！',
            isValid:false
        }});
        this.signUpView.frame.push({placeholder:'你的昵称',type:'text',icon:'user',content:'',openCheck: {
            regExp:/^\S+/,
            errorTip:'请输入昵称！',
            isValid:false
        }});
        this.signUpView.frame.push({placeholder:'手机号码',type:'text',icon:'phone',content:'',openCheck: {
            regExp:/([0-9]{11})/,
            errorTip:'手机格式不正确！',
            isValid:false
        }});
        this.signUpView.frame.push({placeholder:'邮箱',type:'text',icon:'email',content:'',openCheck: {
            regExp:/(^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$)/,
            errorTip:'邮箱格式不正确！',
            isValid:false
        }});
        this.signUpView.frame.push({placeholder:'密码',type:'password',icon:'lock',content:'',openCheck: {
            regExp:/^\S{6,}/,
            errorTip:'请输入密码(6位以上)！',
            isValid:false
        }});
    }
    setTab(tab:boolean){
        this.currentTab=tab;
        this.signInTabClass={
            'tab-active':this.currentTab,
            'tab':!this.currentTab
        }
        this.signUpTabClass={
            'tab-active':!this.currentTab,
            'tab':this.currentTab
        }
        this.log.debug('signInUpComponent','setTab','切换登陆/注册界面');
        if(tab) this.currentTabTip='社交帐号登录';
        else this.currentTabTip='社交帐号注册';
    }
    validChange(result){
         this.isValid=result;
    }
    signUp(){
        if(!this.isValid) return;
    }
    signIn(){
        if(!this.isValid) return;
    }
 }