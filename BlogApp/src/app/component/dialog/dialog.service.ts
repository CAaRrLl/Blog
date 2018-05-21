import { Injectable, Type } from "@angular/core";
import { Subject } from "rxjs/Subject";

@Injectable()
export class DialogService{
    private subject: Subject<DialogModel> = new Subject<DialogModel>();
    
    getObservable() {
        return this.subject.asObservable();
    }

    show(model: DialogModel) {
        this.subject.next(model);
    }

    close() {
        this.subject.next({hidden: true, content: ''});
    }
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