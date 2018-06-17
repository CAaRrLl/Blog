import { Component,OnInit } from '@angular/core';
import { Logger } from './service/logger.service';
import { Observable } from 'rxjs';
import { SideToolService } from './component/side.tool/side.tool.service';

@Component({
  selector: 'app-root',
  template:`
        <router-outlet></router-outlet>
        <app-siderbar></app-siderbar>
        <app-alert></app-alert>
        <app-dialog></app-dialog>
        <app-side-tool></app-side-tool>
        <app-sync-loading></app-sync-loading>
    `
})
export class AppComponent implements OnInit{
    constructor(private log:Logger, private sideToolService: SideToolService){
        let counter;
        log.openCounter(counter);
    }
    ngOnInit(){
        window.onbeforeunload = ()=>{
            this.log.pushCache();
        };
        Observable.fromEvent(window, 'scroll').debounceTime(400).subscribe(
            () => {
                let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                if(scrollTop > window.screen.availHeight) {
                    this.sideToolService.add(
                        {
                            iconTag: 'up',
                            tip: '回到顶部',
                            func: () => {
                                this.gotoTop();
                            }
                        }
                    );
                }
                if(scrollTop <= window.screen.availHeight) {
                    this.sideToolService.delete('up');
                }
            }
        );
    }

    gotoTop() {
        setTimeout(() => {
            if((document.documentElement.scrollTop || document.body.scrollTop) <= 0) return;
            window.scrollBy(0, -100);
            this.gotoTop();
        }, 1000/60);
    }
}