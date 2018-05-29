import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BlogRoutes } from './blog.route';
import { BlogComponent } from './blog.component';
import { NavigationComponent } from './navigation.component/navigation.component';
import { ComponentModule } from '../component/component.module';
import { CommonModule } from '@angular/common';
import { EssayListComponent } from './essay.list.component/essay.list.component';
import { EssayReaderComponent } from './essay.reader.component/essay.reader.component';
import { HomeComponent } from './home.component/home.component';

@NgModule({
    declarations:[
        NavigationComponent,
        EssayListComponent,
        BlogComponent,
        EssayReaderComponent,
        HomeComponent
    ],
    imports:[
        CommonModule,
        ComponentModule,
        RouterModule.forChild(BlogRoutes),
    ]
})

export class BlogModule{

}