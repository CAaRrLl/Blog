import { Injectable, Type } from "@angular/core";
import { Subject } from "rxjs/Subject";

@Injectable()
export class DialogService{
    private subject: Subject<DialogModel> = new Subject<DialogModel>();
    active: boolean = false;
    
    getObservable() {
        return this.subject.asObservable();
    }

    show(model: DialogModel) {
        this.subject.next(model);
        this.active = true;
    }

    close(...params) {
        if(this.onclose) {
            this.onclose(...params);
        }
        this.onclose = undefined;
        this.subject.next({hidden: true, content: ''});
        this.active = false;
    }

    onclose: Function;
}

export interface DialogModel {
    hidden?: boolean;
    width?: string;             //rem
    confirmBtn?: button;
    cancelBtn?: button;
    content: string|Type<any>;
    params?: any;               //键值对
    title?: string
}

interface button{
    name?: string;
    func?: Function;
    hidden?: boolean;
}