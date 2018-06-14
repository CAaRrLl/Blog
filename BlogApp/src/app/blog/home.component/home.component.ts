import { Component, Input, OnInit } from '@angular/core';
import { EventService, EventList } from '../../service/event.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit{
    search: string = '';
    constructor(private event: EventService) {}

    ngOnInit() {
        this.event.on(EventList.SEARCH).subscribe(search => this.search = search || '');
    }
}