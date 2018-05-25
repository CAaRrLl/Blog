import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpService } from '../service/http.service';
import { api } from '../constant/api';
import { EssayListModel } from './essay.list.component/essay.list.component';
import { Logger } from '../service/logger.service';
import { Observable } from 'rxjs/Rx';

@Component({
    templateUrl: './blog.component.html',
    styleUrls: ['./blog.component.scss']
})

export class BlogComponent implements OnInit{
    @ViewChild('loadNextMark') loadNextMarkRef: ElementRef;
    
    constructor(private http: HttpService, private log:Logger) {}

    search: string = "";
    size: number = 6;
    pos: number = 1;
    count: number;

    isloadNext: boolean = false;

    essaylistModel: EssayListModel[] = [];

    essaylistData: EssayListData[] = [];

    ngOnInit() {
        this.loadData();
        Observable.fromEvent(window, 'scroll').debounceTime(400).subscribe(
            () => {
                let loadNextMarkDom = this.loadNextMarkRef.nativeElement as HTMLElement;
                if(loadNextMarkDom.offsetTop < document.body.scrollTop + window.screen.availHeight) {
                    this.loadNextData();
                }
            }
        );
    }

    dataToModel(data: EssayListData[]):EssayListModel[] {
        let res: EssayListModel[] = [];
        data.forEach((item) => {
            let temp: EssayListModel;
            let time = new Date(item.updatetime);
            temp = {
                author: item.hostname,
                collected: item.collected || 0,
                day: (time.getMonth() + 1) + ':' + time.getDate(),
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
        temp.removeChild(temp.children[0]);
        return res;
    }

    loadData() {
        this.isloadNext = true;
        this.http.getJson(api.getpublish, {size: this.size, pos: this.pos}).subscribe(
            res => {
                this.log.debug('BlogComponent','ngOnInit',{'获取发布文章列表数据': res}, );
                this.essaylistData.push(...res['data'].essays);
                this.count = res['data'].count;
                this.essaylistModel.push(...this.dataToModel(res['data'].essays));
                this.isloadNext = false;
            }, err => {
                this.log.error('BlogComponent', 'ngOnInit', {'获取发布文章数据失败': err});
                this.isloadNext = false;
            }
        ) 
    }

    loadNextData() {
        this.pos++;
        this.loadData();
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