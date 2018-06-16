import { Component, OnInit, ViewChild, ElementRef, Input, OnChanges } from '@angular/core';
import { Logger } from '../../../service/logger.service';
import { HttpService } from '../../../service/http.service';
import { EssayListModel } from '../../essay.list.component/essay.list.component';
import { Observable } from 'rxjs/Observable';
import { api } from '../../../constant/api';
import { EventService, EventList } from '../../../service/event.service';

@Component({
    selector: 'app-essay-publish',
    templateUrl: './essay.publish.component.html',
    styleUrls: ['./essay.publish.component.scss']
})

export class EssayPublishComponent implements OnInit, OnChanges{
    @ViewChild('loadNextMark') loadNextMarkRef: ElementRef;
    
    constructor(private http: HttpService, private log: Logger, private event: EventService) {}

    @Input() self: number = 0;
    @Input() tag: string = '';
    @Input() search: string = '';
    size: number;
    pos: number;
    count: number;

    isloadNext: boolean = false;

    essaylistModel: EssayListModel[];

    essaylistData: EssayListData[];

    ngOnInit() {
        this.initModel();
        this.loadData();
        Observable.fromEvent(window, 'scroll').debounceTime(400).subscribe(
            () => {
                let loadNextMarkDom = this.loadNextMarkRef.nativeElement as HTMLElement;
                let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                if(loadNextMarkDom.offsetTop < scrollTop + window.screen.availHeight) {
                    this.loadNextData();
                }
                if(scrollTop > window.screen.availHeight) {
                    this.event.emit(EventList.SIDETOOL, [
                        {
                            iconTag: 'up',
                            tip: '回到顶部',
                            func: () => {
                                this.gotoTop();
                            }
                        }
                    ]);
                }
                if(scrollTop <= window.screen.availHeight) {
                    this.event.emit(EventList.SIDETOOL, []);
                }
            }
        );
    }

    ngOnChanges() {
        this.initModel();
        this.loadData();
    }

    dataToModel(data: EssayListData[]):EssayListModel[] {
        let res: EssayListModel[] = [];
        data.forEach((item) => {
            let temp: EssayListModel;
            let time = new Date(item.updatetime);
            temp = {
                id: item.id,
                author: item.hostname,
                collected: item.collected || 0,
                day: (time.getMonth() + 1) + '.' + time.getDate(),
                time: time.getHours() + ':' + time.getMinutes(),
                headUrl: item.hosthead,
                imgUrl: item.imgUrl,
                msg: item.msg || 0,
                text: this.markdownToText(item.text),
                title: item.title,
                visited: item.readtime || 0,
            }
            res.push(temp);
        });
        return res;
    }

    markdownToText(text: string) {
        let marked = require('marked');
        let html = marked(text);
        let res = '';
        let temp = document.createDocumentFragment();
        temp.appendChild(document.createElement('div'));
        temp.children[0].innerHTML = html;
        res = temp.textContent.replace('\n', ' ');
        res = res.replace(/!\[[\d\D]+\]\([^()]+\)/i, '');
        temp.removeChild(temp.children[0]);
        return res;
    }

    loadData() {
        this.isloadNext = true;
        let query: Query = {
            size: this.size,
            search: this.search,
            tag: this.tag,
            self: this.self,
            pos: this.pos
        };
        this.http.getJson(api.getpublish, query).subscribe(
            res => {
                this.log.debug('EssayPublishComponent','ngOnInit',{'获取发布文章列表数据': res}, );
                this.pos === 1 ? this.essaylistData = res['data'].essays : this.essaylistData.push(...res['data'].essays);
                this.count = res['data'].count;
                this.pos === 1 ? this.essaylistModel = this.dataToModel(res['data'].essays) : this.essaylistModel.push(...this.dataToModel(res['data'].essays));
                this.isloadNext = false;
            }, err => {
                this.log.error('EssayPublishComponent', 'ngOnInit', {'获取发布文章数据失败': err});
                this.isloadNext = false;
            }
        ) 
    }

    loadNextData() {
        this.pos++;
        this.loadData();
    }

    initModel() {
        this.essaylistModel = [];
        this.essaylistData = [];
        this.size = 6;
        this.pos = 1;
    }

    gotoTop() {
        setTimeout(() => {
            if((document.documentElement.scrollTop || document.body.scrollTop) <= 0) return;
            window.scrollBy(0, -100);
            this.gotoTop();
        }, 1000/60);
    }
}

interface EssayListData {
    id: string,
    hostid: string,
    hostname: string,
    hosthead?: string, 
    title: string,
    text: string,    
    size: number,
    readtime: number,
    collected: number,
    msg: number,
    remark: string,
    imgUrl?: string,
    createtime: number,
    updatetime: number
}

interface Query {
    search: string;
    self: number;
    tag: string;
    size: number;
    pos: number;
}