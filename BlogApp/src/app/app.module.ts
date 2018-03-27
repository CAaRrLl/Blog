import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {routes} from './app.routes';
import {AppComponent} from './app.component';
import {SignInUpComponent} from './user/page/sign/sign.in.up.component';
import {RouterModule} from '@angular/router';
import {ComponentModule} from './component/component.module';
import {MgrModule} from './mgr/mgr.module';
import {UserModule} from './user/user.module';
import { Logger } from './service/logger.service';
import { HttpService } from './service/http.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MyInterceptor } from './service/http.interceptor';

@NgModule({
    declarations:[
        AppComponent,
    ],
    imports:[
        BrowserModule,
        HttpClientModule,
        RouterModule.forRoot(routes)
    ],
    providers:[
        Logger,
        HttpService,
        {provide:HTTP_INTERCEPTORS,useClass:MyInterceptor,multi:true}
    ],
    bootstrap:[AppComponent]
})

export class AppModule{}
