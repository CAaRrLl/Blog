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
import { MyInfoComponent } from './my-home/my-info/my.info.component';
import { MyEssayComponent } from './my-home/my-essay/my.essay.component';
import { MyHomeComponent } from './my-home/my.home.component';
import { EssayPublishComponent } from './component/essay.publish/essay.publish.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations:[
        NavigationComponent,
        EssayListComponent,
        BlogComponent,
        EssayReaderComponent,
        HomeComponent,
        MyHomeComponent,
        MyInfoComponent,
        MyEssayComponent,
        EssayPublishComponent
    ],
    imports:[
        CommonModule,
        ComponentModule,
        FormsModule,
        RouterModule.forChild(BlogRoutes),
    ]
})

export class BlogModule{

}