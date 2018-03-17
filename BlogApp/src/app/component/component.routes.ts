import {Routes} from '@angular/router';
import {InputComponent} from './input/input.component';
import {MyComponent} from './component';

export const ComponentRouter:Routes=[
    {
        path:'',
        component:MyComponent,
        children:[
            {
                path:'input',
                component:InputComponent
            }
        ]
    }
];