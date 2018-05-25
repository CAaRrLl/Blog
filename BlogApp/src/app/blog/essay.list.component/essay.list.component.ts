import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-essay-list',
    styleUrls: ['./essay.list.component.scss'],
    templateUrl: './essay.list.component.html'
})

export class EssayListComponent {

    @Input() model: EssayListModel[] = [];
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