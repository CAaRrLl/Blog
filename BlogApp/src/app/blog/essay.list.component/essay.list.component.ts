import {Component, Input} from '@angular/core';
import { route } from '../../constant/router';
import { Router } from '@angular/router';
import { SessionStorage, KEY } from '../../service/sessionStorage.service';

@Component({
    selector: 'app-essay-list',
    styleUrls: ['./essay.list.component.scss'],
    templateUrl: './essay.list.component.html'
})

export class EssayListComponent {

    @Input() model: EssayListModel[] = [];

    constructor(private router: Router, private storage: SessionStorage) {}

    toReader(essayid: string) {
        if(!essayid) return;
        this.storage.set(KEY.READER_ESSAYID, essayid);
        this.router.navigate([route.reader]);
    }

    toReaderComment(essayid: string) {
        if(!essayid) return;
        this.storage.set(KEY.READER_ESSAYID, essayid);
        this.router.navigate([route.reader], {queryParams: {mao: 1}});
    }
}

export interface EssayListModel {
    id: string,
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