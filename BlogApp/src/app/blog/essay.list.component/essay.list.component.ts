import {Component} from '@angular/core';

@Component({
    selector: 'app-essay-list',
    styleUrls: ['./essay.list.component.scss'],
    templateUrl: './essay.list.component.html'
})

export class EssayListComponent {
    getArray(n) {
        let arr = [];
        for(let i=0;i<n;i++) {
            arr.push(i);
        }
        return arr;
    }
}