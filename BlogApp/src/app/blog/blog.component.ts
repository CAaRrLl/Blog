import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpService } from '../service/http.service';
import { api } from '../constant/api';
import { EssayListModel } from './essay.list.component/essay.list.component';
import { Logger } from '../service/logger.service';
import { Observable } from 'rxjs/Rx';
import { SessionStorage, KEY } from '../service/sessionStorage.service';
import { EventService, EventList } from '../service/event.service';
import { LocalStorageService, LKEY } from '../service/localstorage.service';
import { constant } from '../constant/constant';

@Component({
    template: `
    <app-navigation class="nav"></app-navigation>
    <router-outlet></router-outlet>
    `,
    styleUrls: ['./blog.component.scss']
})

export class BlogComponent implements OnInit {
    constructor(private http: HttpService, private storage: SessionStorage, private lstorage: LocalStorageService, private log: Logger, private event: EventService) {}

    getInfo: Observable<any> = this.http.getJson(api.getInfo);

    ngOnInit() {
        if(this.lstorage.get(LKEY.loginStatus) === constant.isUser) {
            this.getInfo.subscribe(
                res => {
                    let info = res['data'];
                    this.storage.set(KEY.MYHOMECP_USERINFO, info);
                    this.event.emit(EventList.USERINFO);
                }, err => {
                    this.log.error('BlogComponent', 'ngOnInit', err);
                }
            );
        }
    }
}