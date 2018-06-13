import { Component, Input, OnChanges } from '@angular/core';

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss']
})

export class PaginationComponent implements OnChanges{
    @Input() model: PaginationModel;

    config: PaginationConfig = {num: 6};

    pageArr: number[] = [];

    ngOnChanges() {
        this.initPageArr();
    }

    initPageArr() {
        this.pageArr = [];
        if(!this.model) return;
        let pageMaxNum = this.getPageLength();
        for(let i = this.model.curPage, 
            end = pageMaxNum > i + this.config.num - 1? i + this.config.num - 1 : pageMaxNum; 
            i <= end; i++) {
                this.pageArr.push(i);
        }
    }

    updatePageArr() {
        let curPage = this.model.curPage;
        let pagelength = this.getPageLength();
        let realnum = this.config.num > pagelength ? pagelength: this.config.num;
        if(curPage === 1) {
            this.pageArr = [];
            for(let i = 1; i <= realnum; i++) {
                this.pageArr.push(i);
            }
        } else if(curPage === pagelength) {
            this.pageArr = [];
            for(let i = curPage - realnum + 1; i <= curPage; i++) {
                this.pageArr.push(i);
            }
        } else if(curPage === this.pageArr[0]){
            this.pageArr.map(val => val - 1);
        } else if(curPage === this.pageArr[this.pageArr.length - 1]) {
            this.pageArr.map(val => val + 1);
        }
    }

    clickPage(page: number) {
        if(!this.model) return;
        this.model.curPage = page;
        if(!this.model.request) {
            return;
        }
        this.model.request();
        this.updatePageArr();
    }

    getPageLength():number {
        if(!this.model) return 0;
        return Math.ceil(this.model.count/this.model.size);
    }

    isActive(page: number) {
        return this.model.curPage == page;
    }
}

export interface PaginationModel {
    count: number;
    curPage: number;
    size: number;
    request: Function;
}
interface PaginationConfig {
    num: number;
}