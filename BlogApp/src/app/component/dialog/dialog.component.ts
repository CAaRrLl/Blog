import { Component,Input, Renderer2, ElementRef, Type, ComponentFactoryResolver, ViewChild, ViewContainerRef } from "@angular/core";
import { OnInit, OnChanges } from "@angular/core/src/metadata/lifecycle_hooks";
import { DialogService, DialogModel } from "./dialog.service";
import { Observable } from 'rxjs/Rx';
import * as _ from 'lodash';

@Component({
    selector: 'app-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.scss']
})

export class DialogComponent{

    @ViewChild('container', {read: ViewContainerRef})
    container: ViewContainerRef;

    private time: number = 300;


    model: DialogModel = {hidden:true, content: ''};
    isSimpleText: boolean;
    hiddenCancel: boolean;
    cancelName: string;
    hiddenConfirm: boolean;
    confirmName: string;

    constructor(private dialog: DialogService, private render: Renderer2, private el: ElementRef,
        private cfr: ComponentFactoryResolver) {
        this.dialog.getObservable().subscribe((model: DialogModel) => {
            if(model.hidden&&!this.model.hidden) {
                this.fadeOut();
                setTimeout(() => {
                    this.model = model;
                }, this.time);
            }else this.model = model;
            if(typeof this.model.content === 'string') {
                this.isSimpleText = true;
            }else {
                this.isSimpleText = false;
                setTimeout(() => {
                    this.createComponent(this.model.content, this.model.params);
                }, 0);
            }
            let cancelBtn = this.model.cancelBtn, confirmBtn = this.model.confirmBtn;
            if(cancelBtn) {
                this.hiddenCancel = cancelBtn.hidden === true? true : false;
                this.cancelName = cancelBtn.name? cancelBtn.name : '取消'; 
            } else {
                this.hiddenCancel = false;
                this.cancelName = '取消'; 
            }
            if(confirmBtn) {
                this.hiddenConfirm = confirmBtn.hidden ===true? true : false;
                this.confirmName = confirmBtn.name? confirmBtn.name : '确定'; 
            } else {
                this.hiddenConfirm = false;
                this.confirmName = '确定';
            }
            //点击弹框外执行弹框取消
            setTimeout(() => {
                let dialogContainer = this.el.nativeElement.querySelector('.dialog-container') as HTMLDivElement;
                let dialog = this.el.nativeElement.querySelector('.dialog') as HTMLDivElement;
                dialogContainer.addEventListener('click', () => {
                    this.cancel();
                });
                dialog.addEventListener('click', (event) => {
                    let e = event ? event : window.event;
                    e.stopPropagation();
                });
            }, 0);
        });
    }

    cancel() {
        let func: Function;
        if(this.model.cancelBtn && this.model.cancelBtn.func) {
            func = this.model.cancelBtn.func;
        } else {
            func = () => {
                this.fadeOut();
                setTimeout(() => {
                    this.model.hidden = true;
                }, this.time);
            }
        }
        func();
    }

    confirm() {
        if(this.model.confirmBtn && this.model.confirmBtn.func) {
            this.model.confirmBtn.func();
        } else {
            this.cancel();
        }
    }
    
    createComponent(type: any, params?: any) {
        let factory = this.cfr.resolveComponentFactory(type);
        let newComponentRef = this.container.createComponent(factory);
        if(!_.isPlainObject(params)){   //如果不是Object类型
            return;
        }
        for(const param in params){
            newComponentRef.instance[param]=params[param];
        }
    }

    private fadeOut() {
        let dialogContainer = this.el.nativeElement.querySelector('.dialog-container');
        let dialog = this.el.nativeElement.querySelector('.dialog');
        this.render.setStyle(dialogContainer, 'opacity', '0');
        this.render.setStyle(dialog, 'top', '0');
    }
}