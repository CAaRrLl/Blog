import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { EventService, EventList } from '../../service/event.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-side-tool',
    templateUrl: './side.tool.component.html',
    styleUrls: ['./side.tool.component.scss']
})

export class SideToolComponent implements OnInit, OnDestroy{

    model = {};

    index: string[] = [];

    subscriptionAdd: Subscription;
    subscriptionDel: Subscription;

    constructor(private event: EventService) {}

    ngOnInit() {
        this.subscriptionAdd = this.event.on(EventList.SIDETOOL)
        .filter(data => data.type === 'add')
        .map(data => data.model)
        .subscribe(
            data => {
                if(Object.prototype.toString.call(data) === '[object Array]') {
                    data.forEach((model) => {
                        this.add(model);
                    })
                    return;
                }
                this.add(data);
            }
        );

        this.subscriptionAdd = this.event.on(EventList.SIDETOOL)
        .filter(data => data.type === 'del')
        .map(data => data.model)
        .subscribe(tag => this.remove(tag));
    }

    add(model: SideToolModel) {
        let tag = model.iconTag;
        this.model[tag] = model;
        if(!this.index.includes(tag)) {
            this.index.push(tag);
        }
    }

    remove(tag: string) {
        if(!tag) return;
        this.model[tag] = undefined;
        let i = this.index.indexOf(tag);
        if(i !== -1) {
            this.index.splice(i, 1);
        }
    }

    doClick(model: SideToolModel) {
        model.func();
    }

    ngOnDestroy() {
        if(this.subscriptionAdd) {
            this.subscriptionAdd.unsubscribe();
        }
        if(this.subscriptionDel) {
            this.subscriptionDel.unsubscribe();
        }
    }
}

export interface SideToolModel {
    iconTag: string;
    func: Function;
    tip: string;
    active?: boolean;
}

