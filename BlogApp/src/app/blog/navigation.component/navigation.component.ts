import { Component, ViewChild, ElementRef, Renderer2, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { route } from '../../constant/router';
import { Logger } from '../../service/logger.service';

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

    constructor(private route:Router, private log:Logger) {}

    ngOnInit() {
        let menu = document.getElementById('menu');
        document.addEventListener("click", () => {
            this.isAppear = false;
            setTimeout(() => {this.isShow = false}, 300);
        });
        menu.addEventListener("click", (event) => {
            event.stopPropagation();
        })
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
        this.route.navigate([route.home]);
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