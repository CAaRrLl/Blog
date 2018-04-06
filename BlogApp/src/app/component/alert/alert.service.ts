import { Injectable } from "@angular/core";
import { Subject } from "rxjs/Subject";

@Injectable()
export class AlertService{
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
        this.subject.next(model);
    }
}

export interface AlertModel {
    type: number,
    msg: string,
    time: number
}

export enum AlertType {
    Loading,
    Error,
    Warn,
    Success
}