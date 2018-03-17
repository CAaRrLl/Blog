import { Component,OnInit } from '@angular/core';
import { Logger } from './service/logger.service';

@Component({
  selector: 'app-root',
  template:`
        <router-outlet></router-outlet>
    `
})
export class AppComponent implements OnInit{
    constructor(private log:Logger){
        let counter;
        log.openCounter(counter);
    }
    ngOnInit(){
        window.onbeforeunload = ()=>{
            this.log.pushCache();
        };
    }
}
