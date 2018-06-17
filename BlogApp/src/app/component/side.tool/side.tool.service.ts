import { Injectable } from "@angular/core";
import { EventService, EventList } from "../../service/event.service";
import { SideToolModel } from "./side.tool.component";

@Injectable()
export class SideToolService {

    constructor(private event: EventService) {}

    add(model: SideToolModel | SideToolModel[]) {
        this.event.emit(EventList.SIDETOOL, {
            type: 'add',
            model: model
        });
    }

    delete(tag: string) {
        this.event.emit(EventList.SIDETOOL, {
            type: 'del',
            model: tag
        })
    }
}

