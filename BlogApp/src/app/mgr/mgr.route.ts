import {Routes} from '@angular/router';
import {MgrComponent} from './mgr.component';
import {TestComponent} from './page/test/test';

export const MgrRoutes:Routes = [
    {
        path:'',
        component:MgrComponent,
        children:[
            {
                path:'test',
                component:TestComponent
            }
        ]
    }
];