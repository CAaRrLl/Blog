import { Component,Input } from "@angular/core";
import { OnInit } from "@angular/core/src/metadata/lifecycle_hooks";
import { Subject } from "rxjs/Subject";

@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.scss']
})

export class AlertComponent{
    private subject: Subject<AlertModel> = new Subject<AlertModel>();
    
    getObservable() {
        return this.subject.asObservable();
    }

    show(model: AlertModel) {
        this.subject.next(model);
    }

    disapear(type: number, msg: string) {
        let model: AlertModel = {
            type: type,
            msg: msg,
            time: 0
        };
        this.subject.next(model);
    }

    appear(type: number, msg: string) {
        let model: AlertModel = {
            type: type,
            msg: msg,
            time: -1
        }
    }
}

export interface AlertModel {
    type: number,
    msg: string,
    time: number
}

export enum AlertType {
    Error,
    Warn,
    Success
}