import { Component,Input, OnChanges } from "@angular/core";
import { OnInit } from "@angular/core/src/metadata/lifecycle_hooks";
import { EventEmitter } from "protractor";

@Component({
    selector: 'app-dropdown',
    templateUrl: './dropdown.component.html',
    styleUrls: ['./dropdown.component.scss']
})

export class DropdownComponent implements OnChanges{

    @Input() headStr: string;
    @Input() headSrc: string;
    @Input() content: DropdownList[] = [];

    isAppear: boolean = false;

    constructor() {
        document.addEventListener('click', () => {
            this.isAppear = false;            
        });
    }

    ngOnChanges() {
        //图片和文字都存在则使用图片
        if(this.headStr && this.headSrc) {
            this.headStr = null;
            return;
        }
        if(!this.headStr && !this.headSrc) {
            this.headSrc = '../../../assets/img/default-head.png';
        }
    }

    show(event: Event) {
        this.isAppear = true;
        this.stopPropagation(event);
    }

    doSomething(func?: Function) {
        if(func) {
            func();
        }
    }
    //停止冒泡
    stopPropagation(event) {
        event.stopPropagation();
    }

    //委托li事件
    delegateList(event) {
        for(let i = 0; i< this.content.length; i++) {
            if(this.content[i].content === event.target.id) {
                this.doSomething(this.content[i].func);
                break;
            }
        }
        this.stopPropagation(event);
    }
}
export interface DropdownList {
    iconTag: string;
    content: string;
    func?: Function;
}