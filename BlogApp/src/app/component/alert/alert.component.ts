import { Component,Input } from "@angular/core";
import { OnInit } from "@angular/core/src/metadata/lifecycle_hooks";
import { AlertService, AlertModel } from "./alert.service";
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

    constructor(private alert: AlertService) {
        this.alert.getObservable().subscribe((model: AlertModel) => {
            this.pushModel(model);
        });
    }

    ngOnInit() {
        this.Observable = Observable.timer(0);
    }

    popModel(index: number) {

    }

    pushModel(model: AlertModel) {
        const observer = () => {
            this.alerts.push(model);
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