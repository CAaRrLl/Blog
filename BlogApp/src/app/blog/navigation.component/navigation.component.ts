import { Component, ViewChild, ElementRef, Renderer2, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { route } from '../../constant/router';
import { Logger } from '../../service/logger.service';
import { AlertService, AlertType } from '../../component/alert/alert.service';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss']
})

export class NavigationComponent implements OnInit{

    iconSrc: string = '../../../assets/img/Book.png';
    iconTip: string = 'BLOG';

    isAppear: boolean = false;
    isShow: boolean = false;

    //搜索用关键字
    key: string;

    constructor(private route:Router, private log:Logger, private alert: AlertService) {}

    ngOnInit() {
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
        // this.alert.show({type:AlertType.Error, msg: '粉红色的尽快发货即可收到回复可见', time: 1000});
        // this.alert.show({type:AlertType.Loading, msg: '粉红色的尽快回复可见', time: 2000});
    }

    //搜索
    search(val: string) {
        this.log.debug('NavigationComponent', 'search', val);
    }

    //进入登陆界面
    toSignIn() {
        this.route.navigate([route.sign], {queryParams: {tab: 'in'}});
    }

    //进入注册界面
    toSignUp() {
        this.route.navigate([route.sign], {queryParams: {tab: 'up'}});
    }

    //进入博客首页
    toHome() {
        this.route.navigate([route.blog]);
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