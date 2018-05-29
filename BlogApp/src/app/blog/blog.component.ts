import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpService } from '../service/http.service';
import { api } from '../constant/api';
import { EssayListModel } from './essay.list.component/essay.list.component';
import { Logger } from '../service/logger.service';
import { Observable } from 'rxjs/Rx';

@Component({
    template: `
    <app-navigation class="nav"></app-navigation>
    <router-outlet></router-outlet>
    `,
    styleUrls: ['./blog.component.scss']
})

export class BlogComponent {}