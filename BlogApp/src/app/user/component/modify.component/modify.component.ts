import {Component} from '@angular/core';

@Component({
    templateUrl:'./modify.component.html',
    styleUrls:['./modify.component.scss']
})

export class ModifyComponent {
    
    constructor() {}
    model: {text: string, tip: ''} = {text: '', tip: ''};
};