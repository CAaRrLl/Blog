import {NgModule} from '@angular/core';
import {MgrRoutes} from './mgr.route';
import {MgrComponent} from './mgr.component';
import {RouterModule} from '@angular/router';
import {TestComponent} from './page/test/test';
import { ComponentModule } from '../component/component.module';

@NgModule({
    declarations:[
        MgrComponent,
        TestComponent,
    ],
    imports:[
        ComponentModule,
        RouterModule.forChild(MgrRoutes)
    ],
    providers:[]
})

export class MgrModule{}