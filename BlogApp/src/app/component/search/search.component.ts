import { Component,Input, Output, EventEmitter, OnInit, ElementRef } from "@angular/core";

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})

export class SearchComponent implements OnInit{
    input: HTMLInputElement;
    val: string;
    @Input() tip: string;
    @Output() valChange:EventEmitter<string> = new EventEmitter<string>();

    constructor(private el:ElementRef) {}

    ngOnInit() {
        if(!this.tip) this.tip = '搜索';
        this.input = this.el.nativeElement.querySelector('.input') as HTMLInputElement;
        let container = this.el.nativeElement.querySelector('.container') as HTMLDivElement;
        document.addEventListener('click', () => {
            this.input.style.width = '8rem';
        });
        container.addEventListener('click', (event) => {
            event.stopPropagation();
        })
    }

    change(val: string) {
        this.val =val;
    }

    emitVal() {
        this.valChange.emit(this.val);
    }

    focus(val: true) {
        if(val) {
            this.input.style.width = '12rem';
        } else {
            this.input.style.width = '8rem';
        }
    }
}