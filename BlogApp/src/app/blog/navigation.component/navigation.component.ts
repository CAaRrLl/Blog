import { Component, ViewChild, ElementRef, Renderer2, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { route } from '../../constant/router';
import { Logger } from '../../service/logger.service';
import { AlertService, AlertType } from '../../component/alert/alert.service';
import { LocalStorageService, LKEY } from '../../service/localstorage.service';
import { constant } from '../../constant/constant';
import { DropdownList } from '../../component/dropdown/dropdown.component';
import { HttpService } from '../../service/http.service';
import { api } from '../../constant/api';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss']
})

export class NavigationComponent implements OnInit{
    isUser: boolean = false;

    iconSrc: string = '../../../assets/img/Book.png';
    iconTip: string = 'BLOG';

    isAppear: boolean = false;
    isShow: boolean = false;

    isPc: boolean = true;

    userNavi: DropdownList[] = [];

    //搜索用关键字
    key: string;

    constructor(private router:Router, private log:Logger,private alert: AlertService, 
        private localStorageService: LocalStorageService,private http: HttpService) {
        }

    ngOnInit() {
        let identity = this.localStorageService.get(LKEY.loginStatus);
        if(identity == constant.isUser) {
            this.isUser = true;
            this.initUserNavi();
        }
        if(identity == constant.isVisitor) {
            this.isUser = false;
        }
        let menu = document.getElementById('menu');
        document.addEventListener("click", () => {
            this.isAppear = false;
            setTimeout(() => {this.isShow = false}, 300);
        });
        menu.addEventListener("click", (event) => {
            let e = event ? event : window.event;
            e.stopPropagation();
        })
        // this.alert.show({type:AlertType.Loading, msg: '粉红色的尽快发货即可收到回复可见', time: 1000});
        // this.alert.show({type:AlertType.Success, msg: '粉红见', time: 3000});
        // this.alert.show({type:AlertType.Warn, msg: '粉红色的回复可见', time: 3000});
    }

    //初始化用户导航
    initUserNavi() {
        this.userNavi = [
            {iconTag: 'home', content: '我的主页'},
            {iconTag: 'bookmark', content: '收藏的文章'},
            {iconTag: 'logout', content: '注销', func: this.layout}
        ];
    }

    // //媒体查询区分手机和电脑
    // initMedia() {
    //     let mediaPhone=window.matchMedia('(max-width: 768px)');
    //     let mediaPc=window.matchMedia('(min-width: 769px)');
    //     mediaPhone.addListener((widthMedia)=>{
    //         if(widthMedia.matches){
    //             this.isPc = false;
    //         }
    //     });
    //     mediaPc.addListener((widthMedia)=>{
    //         if(widthMedia.matches){
    //             this.isPc = true;
    //         }
    //     });
    // }

    //注销
    layout = () => {
        this.http.getJson(api.layout).subscribe(
        success => {
            this.alert.show({type: AlertType.Success, msg: '注销成功', time: 2000});
            this.localStorageService.set(LKEY.loginStatus, constant.isVisitor);
            this.toSignIn();
            this.log.debug('NavigationComponent', 'layout', '注销成功'); 
        }, fail => {
            this.log.error('NavigationComponent', 'layout', fail);
        })
    }

    //搜索
    search(val: string) {
        this.log.debug('NavigationComponent', 'search', val);
    }

    //进入登陆界面
    toSignIn() {
        this.router.navigate([route.sign], {queryParams: {tab: 'in'}});
    }

    //进入注册界面
    toSignUp() {
        this.router.navigate([route.sign], {queryParams: {tab: 'up'}});
    }

    //进入博客首页
    toHome() {
        this.router.navigate([route.blog]);
    }

    //写文章
    makeEssay() {
        if(!this.isUser) {
            this.alert.show({type: AlertType.Warn, msg: '需要先登陆', time: 2000});
            this.toSignIn();
            return;
        }
    }

    dropdown() {
        if(this.isShow && this.isAppear) {
            this.isAppear = false;
            setTimeout(()=>{this.isShow = false}, 300);
        }else if(!this.isShow && !this.isAppear) {
            this.isShow = true;
            this.isAppear = true;
        }
    }
}