import {Routes} from '@angular/router';
import { BlogComponent } from './blog.component';
import { EssayReaderComponent } from './essay.reader.component/essay.reader.component';
import { HomeComponent } from './home.component/home.component';

export const BlogRoutes:Routes = [
    {
        path: 'home',
        component: BlogComponent,
        children: [
            {
                path: 'reader',
                component: EssayReaderComponent
            },
            {
                path: '',
                component: HomeComponent
            }
        ]
    }
];