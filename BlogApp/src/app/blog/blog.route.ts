import {Routes} from '@angular/router';
import { BlogComponent } from './blog.component';
import { EssayReaderComponent } from './essay.reader.component/essay.reader.component';
import { HomeComponent } from './home.component/home.component';
import { MyHomeComponent } from './my-home/my.home.component';
import { MyEssayComponent } from './my-home/my-essay/my.essay.component';
import { MyInfoComponent } from './my-home/my-info/my.info.component';

export const BlogRoutes:Routes = [
    {
        path: '',
        component: BlogComponent,
        children: [
            {
                path: '',
                component: HomeComponent
            },
            {
                path: 'reader',
                component: EssayReaderComponent
            },
            {
                path: 'user',
                component: MyHomeComponent,
                children: [
                    {
                        path: '',
                        component: MyEssayComponent,
                    },
                    {
                        path: 'essay',
                        component: MyEssayComponent,
                    },
                    {
                        path: 'info',
                        component: MyInfoComponent
                    }
                ]
            }
        ]
    }
];