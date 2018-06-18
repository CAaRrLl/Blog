import { Component, Input, OnInit } from '@angular/core';
import { HttpService } from '../../../service/http.service';
import { api } from '../../../constant/api';
import { LocalStorageService, LKEY } from '../../../service/localstorage.service';
import { constant } from '../../../constant/constant';
import { Logger } from '../../../service/logger.service';
import { Router } from '@angular/router';
import { route } from '../../../constant/router';
import { AlertService, AlertType } from '../../../component/alert/alert.service';

@Component({
    selector: 'app-user-list',
    templateUrl: './user.list.component.html',
    styleUrls: ['./user.list.component.scss']
})

export class UserListComponent implements OnInit{

    constructor(private http: HttpService, private lstorage: LocalStorageService, 
        private log: Logger, private router: Router, private alert: AlertService) {}

    model: UserModel[] = [];

    @Input() unit: number = 8;    

    curPage: number = 1;
    num: number = 0;

    isUser: boolean = false;

    ngOnInit() {
        if(this.lstorage.get(LKEY.loginStatus) === constant.isUser) {
            this.isUser = true;
        } else {
            this.isUser = false;
        }
        this.getData();
    }

    getData() {
        this.http.getJson(api.getUserInfoList, {page: this.curPage, size: this.unit}).subscribe(
            res => {
                let data = res['data'];
                this.model = data.userlist;
                this.num = data.count;
            }, err => {
                this.log.error('UserListComponent', 'getData', err);
            }
        )
    }

    nextPage() {
        if(this.islastPage()) return;
        this.curPage++;
        this.getData();
    }

    lastPage() {
        if(this.isfirstPage()) return;
        this.curPage--;
        this.getData();
    }

    islastPage() {
        return Math.ceil(this.num/this.unit) === this.curPage;
    }

    isfirstPage() {
        return this.curPage === 1;
    }

    concern(uid: number, index: number) {
        if(!this.isUser) {
            this.router.navigateByUrl(route.sign);
            return;
        }
        this.http.postJson(api.concern, {id: uid}).subscribe(res => {
            this.alert.show({type: AlertType.Success, msg: '关注成功', time: 2000});
            this.model[index].concern = 1;
        }, err => {
            this.log.error('UserListComponent', 'concern', err);
        });
     }

    unconcern(uid: number, index: number) {
        if(!this.isUser) {
            this.router.navigateByUrl(route.sign);
            return;
        }
        this.http.postJson(api.unconcern, {id: uid}).subscribe(res => {
            this.alert.show({type: AlertType.Success, msg: '已取消关注', time: 2000});
            this.model[index].concern = 0;
        }, err => {
            this.log.error('UserListComponent', 'unconcern', err);
        });
    }
    
}

interface UserModel {
    id: number;
    name: string;
    portrait: string;
    wordnum: number;
    collectnum: number;
    concern: number;
}