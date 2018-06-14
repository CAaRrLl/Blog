import { Component,Input, Output, EventEmitter, OnInit, ElementRef, ViewChild } from "@angular/core";
import { LocalStorageService, LKEY } from "../../service/localstorage.service";
import { HistoryCache } from "./search.history.service";

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
    providers: [HistoryCache]
})

export class SearchComponent implements OnInit{
    @ViewChild('doSearch') doSearchRef: ElementRef;

    input: HTMLInputElement;
    val: string = '';
    isFocus: boolean = false;

    history: string[] = [];

    @Input() tip: string;
    @Output() valChange:EventEmitter<string> = new EventEmitter<string>();

    constructor(private el:ElementRef, private historyCache: HistoryCache) {}

    ngOnInit() {
        this.history = this.historyCache.filter();
        if(!this.tip) this.tip = '搜索';
        this.input = this.el.nativeElement.querySelector('.input') as HTMLInputElement;
        let container = this.el.nativeElement.querySelector('.container') as HTMLDivElement;
        document.addEventListener('click', () => {
            this.focus(false);
        });
        container.addEventListener('click', (event) => {
            let e = event ? event : window.event;
            e.stopPropagation();
            this.isFocus = false;
        });
        window.addEventListener('keyup', (event) => {
            if(event.keyCode === 13) {
                this.emitVal();
            }
        });
    }

    change() {
        this.history = this.historyCache.filter(this.val);
        this.isFocus = true;
    }

    emitVal() {
        this.isFocus = false;
        this.valChange.emit(this.val);
        this.historyCache.add(this.val);
    }

    setVal(val: string) {
        this.val = val;
    }

    focus(val: boolean) {
        if(val) {
            this.input.style.width = '12rem';
        } else {
            this.input.style.width = '8rem';
        }
    }

    deleteHistory(event, item: string) {
        let e = event ? event : window.event;
        e.stopPropagation();
        this.historyCache.del(item);
        this.history = this.historyCache.filter(this.val);
    }

    clearHistory() {
        this.historyCache.clear();
        this.history = this.historyCache.filter(this.val);
    }
}