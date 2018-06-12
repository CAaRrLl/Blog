import { Component, OnInit} from '@angular/core';
import { HttpService } from '../../service/http.service';
import { SessionStorage, KEY } from '../../service/sessionStorage.service';
import { api } from '../../constant/api';
import { Logger } from '../../service/logger.service';
import { route } from '../../constant/router';
import { EventService, EventList } from '../../service/event.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
    selector: 'app-my-home',
    templateUrl: './my.home.component.html',
    styleUrls: ['./my.home.component.scss']
})

export class MyHomeComponent implements OnInit{

    NavEnum = Nav;
    activeNav: number = Nav.Essay; 

    userData: UserData = {
        name: '无名氏',
        remark: '这个人很懒什么都没留下。。',
        img: '../../../../assets/img/default-head.png',
    };

    dataSum: DataSum = {
        follow: 0,
        follower: 0,
        essay: 0,
        wordnum: 0,
        collected: 0
    }

    constructor(private http: HttpService, private storage: SessionStorage, private log: Logger, 
        private router: Router, private event: EventService) {}

    ngOnInit() {
        if(window.location.pathname === route.myinfo) {
            this.activeNav = Nav.Info;
        } else if(window.location.pathname === route.myessay) {
            this.activeNav = Nav.Essay;
        }
        // this.router.events.subscribe(e => {
        //     if(e.constructor === NavigationEnd) {
        //         console.log(e['url']);
        //         if((e as NavigationEnd).url === route.myinfo) {
        //             this.activeNav = Nav.Info;
        //         } else {
        //             this.activeNav = Nav.Essay;
        //         }
        //     }
        // })
        this.getUserInfo();
        this.http.getJson(api.getDataSum).subscribe(
            res => {
                let datasum = res['data'];
                this.storage.set(KEY.MYHOMECP_USERDATASUM, datasum);
                this.setDataSum(datasum);
            }, err => {
                this.log.error('MyHomeComponent', 'ngOnInit', err);
            }
        );
        this.event.on(EventList.USERINFO).subscribe(
            data => {
                this.getUserInfo();
            }
        )
    }

    getUserInfo() {
        if(this.storage.has(KEY.MYHOMECP_USERINFO)) {
            let info = this.storage.get(KEY.MYHOMECP_USERINFO);
            this.setUserInfo(info);
        } else {
            this.http.getJson(api.getInfo).subscribe(
                res => {
                    let info = res['data'];
                    this.storage.set(KEY.MYHOMECP_USERINFO, info);
                    this.setUserInfo(info);
                }, err => {
                    this.log.error('MyHomeComponent', 'ngOnInit', err);
                }
            )
        }
    }

    isNavActive(nav: number) {
        return this.activeNav === nav;
    }

    changeNav(nav: number) {
        this.activeNav = nav;
    }

    setUserInfo(info) {
        this.userData.remark = info.remark || this.userData.remark;
        this.userData.phone = info.phone;
        this.userData.name = info.name || this.userData.name;
        this.userData.level = info.level;
        this.userData.img = info.portrait || this.userData.img;
        this.userData.email = info.email;
    }

    setDataSum(datasum) {
        this.dataSum.follow = datasum.follow || 0;
        this.dataSum.follower = datasum.follower || 0;
        this.dataSum.wordnum = datasum.wordnum || 0;
        this.dataSum.essay = datasum.essay || 0;
        this.dataSum.collected = datasum.collected || 0; 
    }
}

enum Nav {
    Essay,
    Info
}

interface UserData {
    img: string;
    remark: string;
    name: string;
    level?: string;
    email?: string;
    phone?: string;
}

interface DataSum {
    follow: number;
    follower: number;
    essay: number;
    wordnum: number;
    collected: number;
}