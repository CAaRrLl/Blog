import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { EssayListModel } from '../../essay.list.component/essay.list.component';
import { EssayService } from '../../../user/page/markdown-writer/markdown.writer.service';
import { SessionStorage, KEY } from '../../../service/sessionStorage.service';
import { Observable } from 'rxjs/Observable';
import { HttpService } from '../../../service/http.service';
import { Logger } from '../../../service/logger.service';
import { api } from '../../../constant/api';

@Component({
    selector: 'app-my-essay',
    templateUrl: './my.essay.component.html',
    styleUrls: ['./my.essay.component.scss'],
    providers: [EssayService]
})

export class MyEssayComponent implements OnInit{
    constructor(private essayService: EssayService, private storage: SessionStorage, private log: Logger) {}

    tags: any[] =  [{id: '', tag: '全部'}];
    activeTag: string = '';

    ngOnInit() {
        if(this.storage.has(KEY.MYESSAYCP_ACTIVETAG)) {
            this.activeTag = this.storage.get(KEY.MYESSAYCP_ACTIVETAG);
        }
        this.essayService.getTag((res, err) => {
            if(!err) {
                this.tags.push(...res);
            }
        })
    }

    isTagActive(tagid: string) {
        return this.activeTag === tagid;
    }

    setActiveTag(tag: string) {
        this.activeTag = tag;
        this.storage.set(KEY.MYESSAYCP_ACTIVETAG, tag);
    }
}