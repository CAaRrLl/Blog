import {Component, OnInit} from '@angular/core';
import { EventService, EventList } from '../../service/event.service';
import { AlertService } from '../alert/alert.service';

@Component({
    selector: 'app-sync-loading',
    template: `<div class="holder" *ngIf="model">
                    <div class="container">
                        <div class="load"></div>
                        <span class="tip" *ngIf="model.tip">{{model.tip}}</span>
                    </div>
                </div>`,
    styleUrls: ['./sync.loading.component.scss']
})

export class SyncLoadingComponent implements OnInit{
    model: {time: number, tip: string};

    timer: any;

    constructor(private event: EventService, private alert: AlertService) {}

    ngOnInit() {
        this.event.on(EventList.SYNCLOAD).subscribe(data => {
            clearTimeout(this.timer);
            this.initModel();
            if(typeof data === 'number') {
                this.model.time = data;
            } else if(typeof data === 'string') {
                this.model.tip = data;
            } else {
                this.model = (data && data.time && data.tip && data) || {time: 5000, tip: ''};
            }
            if(this.model.time < 0) this.model = null;
            this.timer = setTimeout(() => {
                this.model = null;
            }, this.model.time);
        });
    }

    initModel() {
        this.model = {time: 5000, tip: ''};
    }
}