import {NgModule} from '@angular/core';
import {UserRoutes} from './user.route';
import {RouterModule} from "@angular/router";
import {FormsModule} from '@angular/forms';
import {ComponentModule} from '../component/component.module'
import {CommonModule} from '@angular/common';
import {UserComponent} from './user.component';
import {SignInUpComponent} from './page/sign/sign.in.up.component';

@NgModule({
    declarations:[
        UserComponent,
        SignInUpComponent,
    ],
    imports:[
        FormsModule,
        CommonModule,
        ComponentModule,
        RouterModule.forChild(UserRoutes)
    ],
    providers:[]
})

export class UserModule{};