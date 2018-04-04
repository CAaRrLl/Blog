import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {routes} from './app.routes';
import {AppComponent} from './app.component';
import {RouterModule} from '@angular/router';
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
