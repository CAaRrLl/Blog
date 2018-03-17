import {Component,Input} from "@angular/core";
import {iconMap} from './fontIcon.map';
import { OnChanges, OnInit } from "@angular/core/src/metadata/lifecycle_hooks";

@Component({
    selector:'app-icon',
    template:`<a class={{iconClass}} innerHtml={{icon}}></a>`
})

export class FontIconComponent implements OnChanges{
    @Input() tag:string;
    iconClass:string;
    icon:string;
    ngOnChanges(){
        this.iconClass=this.tag+'-icon';
        this.icon=iconMap[this.tag];
    }
}