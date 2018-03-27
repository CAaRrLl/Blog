import {NgModule} from '@angular/core';
import {UserRoutes} from './user.route';
import {RouterModule} from "@angular/router";
import {FormsModule} from '@angular/forms';
import {ComponentModule} from '../component/component.module'
import {CommonModule} from '@angular/common';
import {UserComponent} from './user.component';
import {SignInUpComponent} from './page/sign/sign.in.up.component';
import { AppModule } from '../app.module';

@NgModule({
    declarations:[
        UserComponent,
        SignInUpComponent,
    ],
    imports:[
        CommonModule,
        FormsModule,
        ComponentModule,
        RouterModule.forChild(UserRoutes)
    ],
    providers:[]
})

export class UserModule{};