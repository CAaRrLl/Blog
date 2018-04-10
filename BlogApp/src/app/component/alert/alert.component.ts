import { Component,Input, Renderer2, ElementRef } from "@angular/core";
import { OnInit } from "@angular/core/src/metadata/lifecycle_hooks";
import { AlertService, AlertModel, AlertType } from "./alert.service";
import { Observable } from 'rxjs/Rx';

@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.scss']
})

export class AlertComponent implements OnInit{

    private time: number = 300;

    alerts: AlertModel[] = [];

    private Observable:Observable<any>;

    private lock: boolean = false;

    constructor(private alert: AlertService, private render: Renderer2, private el: ElementRef) {
        this.alert.getObservable().subscribe((model: AlertModel) => {
            if(model.time === 0) {
                for(let i = 0; i < this.alerts.length; i++) {
                    this.popModelByIndex(i);
                }
                return;
            }
            this.pushModel(model);
        });
    }

    ngOnInit() {
        this.Observable = Observable.timer(0);
    }

    popModel(model: AlertModel) {
        if(model.type === AlertType.Loading && model.time === -1) return;
        let alert = this.el.nativeElement.querySelector('.container').children[this.alerts.indexOf(model)];
        this.render.addClass(alert, 'disappear');
        this.render.setStyle(alert, 'margin-top', '-2.5rem');
        this.render.setStyle(alert, 'opactiy', '0');
        setTimeout(() => {
            let index = this.alerts.indexOf(model);
            if(index !== -1) {
                this.alerts.splice(index, 1);
            }
        }, this.time);
    }

    popModelByIndex(index: number) {
        let model = this.alerts[index];
        let alert = this.el.nativeElement.querySelector('.container').children[this.alerts.indexOf(model)];
        this.render.addClass(alert, 'disappear');
        this.render.setStyle(alert, 'margin-top', '-2.5rem');
        this.render.setStyle(alert, 'opactiy', '0');
        setTimeout(() => {
            let index = this.alerts.indexOf(model);
            if(index !== -1) {
                this.alerts.splice(index, 1);
            }
        }, this.time);
    }

    pushModel(model: AlertModel) {
        const observer = () => {
            this.alerts.push(model);
            if(model.time !== -1 && model.time !== 0) {
                setTimeout(() => {
                    let index = this.alerts.indexOf(model);
                    if(index !== -1) {
                        this.popModel(model);
                    }
                }, model.time + this.time);
            }
            this.Observable = Observable.timer(this.time);
            this.lock = false;
        }
        if(!this.lock) {
            this.lock = true;
            this.Observable.subscribe(observer);
        }else {
            let timer = setInterval(()=>{
                if(!this.lock) {
                    this.lock = true;
                    this.Observable.subscribe(observer);
                    clearInterval(timer);
                }
            },0);
        }
    }
}