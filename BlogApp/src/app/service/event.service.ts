import { Injectable,EventEmitter} from "@angular/core";

@Injectable()
export class EventService {
    private change: EventEmitter<any>;

    constructor() {
        this.change = new EventEmitter<any>();
    }

    on(event: number) {
        return this.change.filter(e => e.event === event).map(e => e.data);
    }

    emit(event: number, data?: any) {
        this.change.emit({event: event, data: data});
    }
}
export enum EventList{
    USERINFO,
    SIDETOOL,
    SYNCLOAD
}