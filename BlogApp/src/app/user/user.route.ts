import {Routes} from '@angular/router';
import {UserComponent} from './user.component';
import {SignInUpComponent} from './page/sign/sign.in.up.component';

export const UserRoutes:Routes = [
    {
        path:'',
        component: UserComponent,
        children:[
            {
                path:'sign',
                component: SignInUpComponent
            }
        ]
    },
    
];