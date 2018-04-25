import {Component, Input, OnChanges} from '@angular/core';
import { DropdownList } from '../../../component/dropdown/dropdown.component';

@Component({
    selector:'app-writer-nav',
    templateUrl:'./writer.list.nav.html',
    styleUrls:['./writer.list.nav.scss']
})

export class WriterListNavComponent{
    @Input() active: boolean = false;
    @Input() configure: DropdownList[] = [];  
    @Input() night: boolean = false;

    currentClass: any;

    ngOnChanges() {
        this.currentClass = {
            'active': this.active,
            'night': this.active&&this.night,
            'day': this.active&&!this.night,
            'dark': this.night,
            'light': !this.night
        }
    }
}