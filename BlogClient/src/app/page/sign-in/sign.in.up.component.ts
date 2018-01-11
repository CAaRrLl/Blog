import{Component} from '@angular/core';

@Component({
    selector:'app-sign-in',
    templateUrl:'./sign.in.up.component.html',
    styleUrls:['./sign.in.up.component.scss']
})

export class SignInUpComponent{
    tab={
        signIn:{
            mark:1,
            tips:"社交帐号登录"
        },
        signUp:{
            mark:2,
            tips:"社交帐号注册"
        }
    };
    currentTab:any;
    constructor(){
        this.currentTab=this.tab.signUp;
    }

    setTab(tab:any){
        this.currentTab=tab;
    }
}