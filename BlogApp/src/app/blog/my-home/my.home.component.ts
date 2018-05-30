import { Component, OnInit} from '@angular/core';
import { HttpService } from '../../service/http.service';

@Component({
    selector: 'app-my-home',
    templateUrl: './my.home.component.html',
    styleUrls: ['./my.home.component.scss']
})

export class MyHomeComponent implements OnInit{

    NavEnum = Nav;
    activeNav: number = Nav.Essay; 

    constructor(private http: HttpService) {}

    ngOnInit() {
        
    }

    isNavActive(nav: number) {
        return this.activeNav === nav;
    }

    changeNav(nav: number) {
        this.activeNav = nav;
    }

}

enum Nav {
    Essay,
    Info
}