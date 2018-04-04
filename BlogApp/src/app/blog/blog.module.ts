import {NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { BlogRoutes } from './blog.route';
import { BlogComponent } from './blog.component';
import { NavigationComponent } from './navigation.component/navigation.component';

@NgModule({
    declarations:[
        NavigationComponent,
        BlogComponent
    ],
    imports:[
        RouterModule.forChild(BlogRoutes),
    ]
})

export class BlogModule{

}