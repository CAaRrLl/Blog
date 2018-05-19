import {NgModule} from '@angular/core';
import {UserRoutes} from './user.route';
import {RouterModule} from "@angular/router";
import {FormsModule} from '@angular/forms';
import {ComponentModule} from '../component/component.module'
import {CommonModule} from '@angular/common';
import {UserComponent} from './user.component';
import {SignInUpComponent} from './page/sign/sign.in.up.component';
import { AppModule } from '../app.module';
import { MarkdownWriter } from './page/markdown-writer/markdown.writer';
import { TestComponent } from './page/test/test';
import { HtmlRender } from './component/html-render/html.render';
import { InsertImgComponent } from './component/insert-img/insert.img';

@NgModule({
    declarations:[
        UserComponent,
        SignInUpComponent,
        MarkdownWriter,
        HtmlRender,
        TestComponent
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