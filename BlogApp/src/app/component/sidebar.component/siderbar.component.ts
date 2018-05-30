import { Component, Renderer2, ElementRef} from "@angular/core";
import { OnInit, OnChanges } from "@angular/core/src/metadata/lifecycle_hooks";
import { SiderbarService, SiderbarModel } from "./siderbar.service";
import { Observable } from 'rxjs/Rx';

@Component({
    selector: 'app-siderbar',
    templateUrl: './siderbar.component.html',
    styleUrls: ['./siderbar.component.scss']
})

export class SiderbarComponent{

    model: SiderbarModel;

    hidden: boolean = true;
    background: HTMLDivElement;
    target: HTMLDivElement;

    constructor(private siderbarService: SiderbarService, private render: Renderer2, private el: ElementRef) {
        this.siderbarService.getObservable().subscribe((model) => {
            this.model = model;
            if(!this.model.hidden) {
                this.showSiderbar();
            }else {
                this.closeSiderbar();
            }
        });
    }

    initElement() {
        this.background = this.el.nativeElement.querySelector('#background');;
        this.target = this.el.nativeElement.querySelector('#target');
    }

    closeSiderbar() {
        if(!this.render || !this.background) return;
        this.render.setStyle(this.background, 'opacity', '0');
        this.render.setStyle(this.target, 'transform', 'translateX(-60vw)');
        this.background.addEventListener('transitionend', () => {
            this.hidden =true;
        })
    }

    showSiderbar() {
        this.hidden = false;
        // let raf = window.requestAnimationFrame || window.webkitRequestAnimationFrame;
        setTimeout(() => {
            this.initElement();
            this.render.setStyle(this.background, 'opacity', '0.3');
            this.render.setStyle(this.target, 'transform', 'translateX(0)');
        }, 1000/60);
    }

    doSomething(func: Function) {
        if(func) {
            func();
        }
    }

    delegateList(target) {
        for(let i = 0; i < this.model.list.length; i++) {
            let content = this.model.list[i];
            if(content.content === target.id) {
                this.doSomething(content.func);
                break;
            }
        }
    }
}