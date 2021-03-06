import {Component, ElementRef, ViewChild, OnInit} from '@angular/core';
import { InputJson } from '../../../component/component.interface';
import { Logger } from '../../../service/logger.service';
import { HttpService } from '../../../service/http.service';
import { api } from '../../../constant/api';
import { ActivatedRoute, Router } from '@angular/router';
import { route } from '../../../constant/router';
import { AlertService, AlertType } from '../../../component/alert/alert.service';
import { LocalStorageService, LKEY } from '../../../service/localstorage.service';
import { constant } from '../../../constant/constant';
import { routes } from '../../../app.routes';

@Component({
    selector:'app-sign-in',
    templateUrl:'./sign.in.up.component.html',
    styleUrls:['./sign.in.up.component.scss']
})

export class SignInUpComponent implements OnInit{
    @ViewChild('in') in: ElementRef;
    @ViewChild('up') up: ElementRef;
    
    signInView: InputJson = new InputJson();
    signUpView: InputJson = new InputJson();
    currentTab: boolean = true;  //true:登陆 false:注册
    currentTabTip: string = '社交帐号登录';
    isSignIned: boolean = false;
    isSignUped: boolean = false;
    signIning: boolean = false;
    signUping: boolean = false;
    isValid: boolean;
    signInTabClass = {
        'tab-active': this.currentTab,
        'tab': !this.currentTab
    }
    signUpTabClass = {
        'tab-active': !this.currentTab,
        'tab': this.currentTab
    }

    constructor(private log: Logger,private http: HttpService,private alert: AlertService,
        private aroute: ActivatedRoute,private route: Router, private localStorageService: LocalStorageService) {
        this.signInView.frame.push({placeholder:'手机号或邮箱号',type:'text',icon:'user',content:'',openCheck: {
            regExp:/(^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$)|(^[0-9]{11}$)/,
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
            regExp:/(^[0-9]{11}$)/,
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

    ngOnInit() {
        this.aroute.queryParams.subscribe(params => {
            switch (params['tab']) {
                case 'in':
                    this.setTab(true);
                    break;
                case 'up':
                    this.setTab(false);
                    break;
            }
        });
        window.addEventListener('keyup', (event) => {
            if(event.keyCode === 13) {
                switch (this.currentTab) {
                    case true:
                    this.in['showFirstValidTip']();
                    this.signIn();
                    break;
                    case false:
                    this.up['showFirstValidTip']();
                    this.signUp();
                    break;
                }
            }
        });
    }

    setTab(tab:boolean) {
        this.isValid = false;
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
    validChange(result) {
         this.isValid=result;
    }
    signUp() {
        if(!this.isValid) {
            this.alert.show({type: AlertType.Warn, msg: '请检查内容是否合法', time: 2000});
            return;
        }
        if(this.isSignUped) {
            this.alert.show({type: AlertType.Warn, msg: '不可重复注册', time: 2000});
            return;
        }
        let body={
            name:this.signUpView.frame[0].content,
            phone:this.signUpView.frame[1].content,
            email:this.signUpView.frame[2].content,
            password:this.signUpView.frame[3].content
        }
        this.log.debug('SignInUpComponent','signUp',body);
        this.signUping = true;
        this.http.postJson(api.register,body).subscribe(
            success=>{
                this.alert.show({type: AlertType.Success, msg: '注册成功', time: 2000});
                this.log.debug('SignInUpComponent','signUp',success);
                this.signUping = false;
                this.isSignUped = true;
                this.setTab(true);
            },fail=>{
                this.signUping = false;
                this.log.error('SignInUpComponent','signUp',fail);
            }
        )
    }
    signIn() {
        if(!this.isValid) {
            this.alert.show({type: AlertType.Warn, msg: '请检查内容是否合法', time: 2000});
            return;
        }
        if(this.isSignIned) return;
        let body={
            account:this.signInView.frame[0].content,
            password:this.signInView.frame[1].content
        }
        this.log.debug('SignInUpComponent','signIn',body);
        this.signIning = true;
        this.http.postJson(api.userlogin,body).subscribe(
            success=>{ 
                this.alert.show({type: AlertType.Success, msg: '登陆成功', time: 2000});
                this.log.debug('SignInUpComponent','signIn',success);
                this.signIning = false;
                this.isSignIned = true;
                this.localStorageService.set(LKEY.loginStatus, constant.isUser);
                this.route.navigate([route.blog]);
            },fail=>{
                this.signIning = false;
                this.log.error('SignInUpComponent','signIn',fail);
            }
        )
    }
    
    toBlog() {
        this.route.navigate([route.blog]);
    }
 }