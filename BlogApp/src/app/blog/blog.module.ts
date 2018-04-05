import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BlogRoutes } from './blog.route';
import { BlogComponent } from './blog.component';
import { NavigationComponent } from './navigation.component/navigation.component';
import { ComponentModule } from '../component/component.module';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations:[
        NavigationComponent,
        BlogComponent
    ],
    imports:[
        CommonModule,
        ComponentModule,
        RouterModule.forChild(BlogRoutes),
    ]
})

export class BlogModule{

}