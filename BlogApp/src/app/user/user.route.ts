import {Routes} from '@angular/router';
import {UserComponent} from './user.component';
import {SignInUpComponent} from './page/sign/sign.in.up.component';
import { MarkdownWriter } from './page/markdown-writer/markdown.writer';
import { TestComponent } from './page/test/test';

export const UserRoutes:Routes = [
    {
        path:'',
        component: UserComponent,
        children:[
            {
                path:'sign',
                component: SignInUpComponent
            },
            {
                path:'writer',
                component: MarkdownWriter
            },
            {
                path: 'test',
                component: TestComponent
            },
        ]
    },
    
];