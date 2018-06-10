import {Component, Input, OnChanges, ViewChild, ElementRef} from '@angular/core';

@Component({
    selector:'app-html-render',
    templateUrl:'./html.render.html',
    styleUrls:['./html.render.scss']
})

export class HtmlRender implements OnChanges{
    
    @ViewChild('htmlContainerRef') htmlContainerRef: ElementRef;
    @Input() html: string;
    @Input() title: string;

    ngOnChanges() {
        this.htmlContainerRef.nativeElement.innerHTML = this.makedownTohtml();
        if(window['Prism']) {
            window['Prism'].highlightAll();
        }
    }

    makedownTohtml() {
        if(!this.html) return '';
        let marked = require('marked');
        let html = marked(this.html);
        return `<div class="markdown-body">
                    <h1>${this.title}</h1>
                    ${html}
                </div>`;
    }
}