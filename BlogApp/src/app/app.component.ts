import { Component,OnInit } from '@angular/core';
import { Logger } from './service/logger.service';

@Component({
  selector: 'app-root',
  template:`
        <router-outlet></router-outlet>
        <app-siderbar></app-siderbar>
        <app-alert></app-alert>
        <app-dialog></app-dialog>
        <app-side-tool></app-side-tool>
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
