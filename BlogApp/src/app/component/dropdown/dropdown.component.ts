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
    @Input() headIcon: string;
    @Input() direction: string;
    @Input() content: DropdownList[] = [];

    isAppear: boolean = false;
    isleft: boolean  = true;

    constructor() {
        document.addEventListener('click', () => {
            this.isAppear = false;            
        });
    }

    ngOnChanges() {   
        //优先级 图片>文字>字体图标  
        switch (this.direction) {
            case 'right':
                this.isleft = false;
                break;
            case 'left':
            default:
                this.isleft = true;
                break;          
        }
        if(this.headSrc) {
            this.headStr = null;
            this.headIcon = null;
            return;
        }
        if(this.headStr) {
            this.headSrc = null;
            this.headIcon = null;
            return;
        }
        if(this.headIcon) {
            this.headStr = null;
            this.headSrc = null;
            return;
        }
        this.headSrc = '../../../assets/img/default-head.png';       
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
                this.isAppear = false;
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