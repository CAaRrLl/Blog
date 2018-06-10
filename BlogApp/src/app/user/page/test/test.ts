import {Component, ElementRef, ViewChild} from '@angular/core';
import { DialogService } from '../../../component/dialog/dialog.service';
import { EventService, EventList } from '../../../service/event.service';

@Component({
    selector:'app-test',
    templateUrl:'./test.html',
    styleUrls:['./test.scss']
})

export class TestComponent{
    constructor(private dialog: DialogService, private event: EventService) {}
    isActive = false;
    dropdown = [
        {iconTag: 'home', content: '我的主页'},
        {iconTag: 'bookmark', content: '收藏的文章'},
        {iconTag: 'logout', content: '注销'}
    ];
    setActive() {
        this.isActive = !this.isActive;
    }
    dialogShow(i: number) {
        switch(i) {
            case 1:
                this.dialog.show({width: '2rem', content: '的妇科大夫精神的理解'});
                break;
            case 2:
                this.dialog.show({width: '2rem', content: '的妇科大夫精神的理解', confirmBtn: {hidden: true}, cancelBtn: {hidden: true}});
                break;
            case 3:
                this.dialog.show({width: '2rem', content: '的妇科大夫精神的理解',confirmBtn: {name: 'true'}, cancelBtn: {name:'取消改了'}});
                break;
            case 4:
                this.dialog.show({width: '2rem', content: '的妇科大夫精神的理解',confirmBtn: {hidden: true}, cancelBtn: {name:'取消改了'}});
                break;
            case 5:
                this.dialog.show({width: '2rem', content: '的妇科大夫精神的理解',confirmBtn: {name: 'true'}, cancelBtn: {hidden:true}});
                break;
            case 6: 
                this.event.emit(EventList.SYNCLOAD, {});
                break;
            case 7: 
                this.event.emit(EventList.SYNCLOAD, 1000);
                break;
            case 8: 
                this.event.emit(EventList.SYNCLOAD, '百发百中');
                break;
            case 9: 
                this.event.emit(EventList.SYNCLOAD, {time: -2000, tip: '正在上传头像'});
                break;
        }
    }
};