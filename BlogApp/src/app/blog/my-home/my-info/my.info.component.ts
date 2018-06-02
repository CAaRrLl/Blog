import { Component, OnInit, Output } from '@angular/core';
import { HttpService } from '../../../service/http.service';
import { DialogService } from '../../../component/dialog/dialog.service';
import { InsertImgComponent } from '../../../user/component/insert-img/insert.img';
import { api } from '../../../constant/api';
import { Logger } from '../../../service/logger.service';
import { AlertService, AlertType } from '../../../component/alert/alert.service';
import { SessionStorage, KEY } from '../../../service/sessionStorage.service';
import { EventEmitter } from 'events';
import { EventService, EventList } from '../../../service/event.service';

@Component({
    selector: 'app-my-info',
    templateUrl: './my.info.component.html',
    styleUrls: ['./my.info.component.scss']
})

export class MyInfoComponent implements OnInit{

    defaultHead: string = '../../../../assets/img/default-head.png';

    EditList = Edit;

    portrait: string;
    name: string;
    remark: string;
    email: string;
    phone: string;

    editItem: number;

    constructor(private http: HttpService, private dialog: DialogService, private log: Logger, private alert: AlertService, 
        private event: EventService, private storage: SessionStorage) {}

    ngOnInit() {
        let info: any = {};
        if(this.storage.has(KEY.MYHOMECP_USERINFO)) {
            info = this.storage.get(KEY.MYHOMECP_USERINFO);
            this.setUserInfo(info);
        } else {
            this.http.getJson(api.getInfo).subscribe(
                res => {
                    info = res['data'];
                    this.storage.set(KEY.MYHOMECP_USERINFO, info);
                    this.setUserInfo(info);
                }, err => {
                    this.log.error('MyInfoComponent', 'ngOnInit', err);
                }
            )
        }
    }

    setUserInfo(info) {
        this.portrait = info.portrait || this.portrait || this.defaultHead;
        this.name = info.name || '无名氏';
        this.remark = info.remark || '这个人很懒什么都没留下。。';
        this.email = info.email || '无';
        this.phone = info.phone || '无';
    }

    editPortraint() {
        this.dialog.show({
            content: InsertImgComponent,
            confirmBtn: {hidden: true},
            cancelBtn: {hidden: true}
        })
        this.dialog.onclose = (data) => {
            let reg = /!\[[\u4e00-\u9fa5\d\w\(\)._]+\]\(([^()]+)\)/i;
            let match = reg.exec(data.text);
            if(match && match.length == 2) {
                this.portrait = match[1];
            } else {
                this.portrait = this.portrait || this.defaultHead;
            }
        }
    }

    isEditing(item: number) {
        return item === this.editItem;
    }

    setEditItem(item: number) {
        this.editItem = item;
        if(this.editItem === Edit.Portrait) {
            this.editPortraint();
        }
    }

    saveInfo() {
        if(this.editItem !== undefined && this.editItem !== Edit.Portrait) return;
        let body = {
            portrait: this.portrait,
            name: this.name,
            remark: this.remark
        };
        this.http.postJson(api.saveInfo, body).subscribe(
            res => {
                this.log.debug('MyInfoComponent', 'saveInfo', '保存个人信息成功');
                this.alert.show({type: AlertType.Success, msg: '保存个人信息成功', time: 1000});
                let info = this.storage.get(KEY.MYHOMECP_USERINFO);
                info.portrait = this.portrait;
                info.name = this.name;
                info.remark = this.remark;
                this.storage.set(KEY.MYHOMECP_USERINFO, info);
                this.event.emit(EventList.USERINFO);
            }, err => {
                this.log.error('MyInfoComponent', 'saveInfo', err);
            }
        )
    }

    editOk() {
        this.editItem = undefined;
    }
}
enum Edit {
    Portrait,
    Name,
    Remark,
    Email,
    Phone
}