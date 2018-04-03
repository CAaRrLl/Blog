import {NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { BlogRoutes } from './blog.route';
import { BlogComponent } from './blog.component';
import { NavigationComponent } from './navigation.component/navigation.component';
import { FontIconComponent } from '../component/fontIcon/fontIcon.component';

@NgModule({
    declarations:[
        FontIconComponent,
        NavigationComponent,
        BlogComponent
    ],
    imports:[
        RouterModule.forChild(BlogRoutes),
    ]
})

export class BlogModule{

}