import {Routes} from '@angular/router';

export const routes:Routes = [
    {
        path: 'user', 
        loadChildren: './user/user.module#UserModule'
    },
    {
        path: 'mgr', 
        loadChildren: './mgr/mgr.module#MgrModule'
    },
    {
        path: 'cp',
        loadChildren: './component/component.module#ComponentModule'
    }
];
