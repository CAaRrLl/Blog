import {Component, ElementRef, ViewChild} from '@angular/core';
import { DialogService } from '../../../component/dialog/dialog.service';

@Component({
    selector:'app-test',
    templateUrl:'./test.html',
    styleUrls:['./test.scss']
})

export class TestComponent{
    constructor(private dialog: DialogService) {}
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
        }
    }
};