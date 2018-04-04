import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { route } from '../../constant/router';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss']
})

export class NavigationComponent {
    iconSrc: string = '../../../assets/img/Book.png';
    iconTip: string = 'BLOG';

    constructor(private route:Router) {}

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
}