import { Injectable } from "@angular/core";
import { Subject } from "rxjs/Subject";

@Injectable()
export class SiderbarService{
    private subject: Subject<SiderbarModel> = new Subject<SiderbarModel>();
    
    getObservable() {
        return this.subject.asObservable();
    }

    show(model: SiderbarModel) {
        this.subject.next(model);
    }

    close() {
        this.subject.next({headSrc: '', name: '', hidden: true, list: [{iconTag: '', content: ''}]});
    }
}

export interface SiderbarModel {
    headSrc: string;
    name: string;
    hidden?: boolean;
    list: {
        iconTag: string;
        content: string;
        func?: Function;
    } []
}