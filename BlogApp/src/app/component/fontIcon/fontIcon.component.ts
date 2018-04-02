import {Component,Input} from "@angular/core";
import {iconMap} from './fontIcon.map';
import { OnChanges, OnInit } from "@angular/core/src/metadata/lifecycle_hooks";

@Component({
    selector:'app-icon',
    template:`<a class={{iconClass}} [class.spin]="isSpin" innerHtml={{icon}}></a>`,
    styleUrls:['./fontIcon.component.scss']
})

export class FontIconComponent implements OnChanges{
    @Input() tag:string;
    iconClass:string;
    icon:string;
    isSpin:boolean = false;
    ngOnChanges() {
        this.iconClass = this.tag + '-icon';
        let pattern:RegExp = new RegExp('spin');
        if(pattern.exec(this.tag) != null) {
           this.isSpin = true; 
        }
        this.icon = iconMap[this.tag];
    }
}