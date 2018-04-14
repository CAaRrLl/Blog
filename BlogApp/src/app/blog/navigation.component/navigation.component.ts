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
import { SiderbarService, SiderbarModel } from '../../component/sidebar.component/siderbar.service';

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

    //进入登陆界面
    toSignIn = () => {
        this.router.navigate([route.sign], {queryParams: {tab: 'in'}});
    }

    //进入注册界面
    toSignUp = () => {
        this.router.navigate([route.sign], {queryParams: {tab: 'up'}});
    }

    //进入博客首页
    toHome = () => {
        this.router.navigate([route.blog]);
    }

    //写文章
    makeEssay = () => {
        if(!this.isUser) {
            this.alert.show({type: AlertType.Warn, msg: '需要先登陆', time: 2000});
            this.toSignIn();
            return;
        }
    }

    naviListFunc = {
        '首页': this.toHome,
        '登陆': this.toSignIn,
        '注册': this.toSignUp,
        '写文章': this.makeEssay
    }; 

    //搜索用关键字
    key: string;

    constructor(private router:Router, private log:Logger,private alert: AlertService, private siderbar: SiderbarService, 
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
    }

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

    //初始化用户导航
    initUserNavi() {
        this.userNavi = [
            {iconTag: 'home', content: '我的主页'},
            {iconTag: 'bookmark', content: '收藏的文章'},
            {iconTag: 'logout', content: '注销', func: this.layout}
        ];
    }

    //搜索
    search(val: string) {
        this.log.debug('NavigationComponent', 'search', val);
    }

    //打开侧边栏
    siderbarShow() {
        let model: SiderbarModel = {
            headSrc: '../../../assets/img/default-head.png',
            name: '大哥',
            list: [
                {iconTag: 'home', content: '我的主页'},
                {iconTag: 'bookmark', content: '收藏的文章'},
                {iconTag: 'logout', content: '注销', func: () => {
                    this.layout();
                    this.siderbar.close();
                }}
            ]
        };
        this.siderbar.show(model);
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

    //用户功能列表事件委托
    delegateList(target) {
        let val = target.innerHTML;
        this.naviListFunc[val]();
    }

    //获取json的key
    getObjectKey(object: any, index: number) {
        let i = 0;
        for(const key in object) {
            if(i === index) {
                return key;
            }
            i++;
        }
    }
}