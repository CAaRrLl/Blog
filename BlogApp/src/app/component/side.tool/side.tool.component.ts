import { Component, Input, OnInit } from '@angular/core';
import { EventService, EventList } from '../../service/event.service';

@Component({
    selector: 'app-side-tool',
    templateUrl: './side.tool.component.html',
    styleUrls: ['./side.tool.component.scss']
})

export class SideToolComponent implements OnInit{

    model: SideToolModel[] = [];

    constructor(private event: EventService) {}

    ngOnInit() {
        this.event.on(EventList.SIDETOOL).subscribe(
            data => {
                if(Object.prototype.toString.call(data) === '[object Array]') {
                    this.model = data;
                    return;
                }
                this.model.push(data);
            }
        );
    }
}

export interface SideToolModel {
    iconTag: string;
    func: Function;
    tip: string;
}