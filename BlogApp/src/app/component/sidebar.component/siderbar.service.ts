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
        this.subject.next({hidden: true, content: ''});
    }
}

export interface SiderbarModel {
    
}