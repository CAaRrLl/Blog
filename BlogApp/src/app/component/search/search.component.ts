import { Component,Input, Output, EventEmitter, OnInit, ElementRef } from "@angular/core";

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})

export class SearchComponent implements OnInit{
    input: HTMLInputElement;
    val: string = '';
    isFocus: boolean = false;

    history: string[] = ['你好吗？', '区块链', '知识盲区'];

    @Input() tip: string;
    @Output() valChange:EventEmitter<string> = new EventEmitter<string>();

    constructor(private el:ElementRef) {}

    ngOnInit() {
        if(!this.tip) this.tip = '搜索';
        this.input = this.el.nativeElement.querySelector('.input') as HTMLInputElement;
        let container = this.el.nativeElement.querySelector('.container') as HTMLDivElement;
        document.addEventListener('click', () => {
            this.focus(false);
        });
        container.addEventListener('click', (event) => {
            let e = event ? event : window.event;
            e.stopPropagation();
        })
    }

    change(val: string) {
        this.val =val;
    }

    emitVal() {
        this.valChange.emit(this.val);
    }

    setVal(val: string) {
        this.val = val;
    }

    focus(val: boolean) {
        if(val) {
            this.input.style.width = '12rem';
            this.isFocus = true;
        } else {
            this.input.style.width = '8rem';
            this.isFocus = false;
        }
    }

    deleteHistory(event, i: number) {
        let e = event ? event : window.event;
        e.stopPropagation();
        this.history.splice(i, 1);
    }
}