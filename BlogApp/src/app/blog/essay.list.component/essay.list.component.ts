import {Component, Input} from '@angular/core';
import { route } from '../../constant/router';

@Component({
    selector: 'app-essay-list',
    styleUrls: ['./essay.list.component.scss'],
    templateUrl: './essay.list.component.html'
})

export class EssayListComponent {

    @Input() model: EssayListModel[] = [];

    toReader() {
        
    }
}

export interface EssayListModel {
    headUrl: string,
    author: string,
    day: string,
    time: string,
    title: string,
    text: string,
    visited: number,
    msg: number,
    collected: number,
    imgUrl?: string
}