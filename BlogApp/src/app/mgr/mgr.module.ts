import {NgModule} from '@angular/core';
import {MgrRoutes} from './mgr.route';
import {MgrComponent} from './mgr.component';
import {RouterModule} from '@angular/router';
import {TestComponent} from './page/test/test';

@NgModule({
    declarations:[
        MgrComponent,
        TestComponent
    ],
    imports:[
        RouterModule.forChild(MgrRoutes)
    ],
    providers:[]
})

export class MgrModule{}