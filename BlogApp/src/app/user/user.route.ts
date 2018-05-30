import {Routes} from '@angular/router';
import {UserComponent} from './user.component';
import {SignInUpComponent} from './page/sign/sign.in.up.component';
import { MarkdownWriter } from './page/markdown-writer/markdown.writer';
import { TestComponent } from './page/test/test';
import { MyHomeComponent } from './page/my-home/my.home.component';

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
                path: 'home',
                component: MyHomeComponent
            },
            {
                path: 'test',
                component: TestComponent
            },
        ]
    },
    
];