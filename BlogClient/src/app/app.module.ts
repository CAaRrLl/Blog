import {NgModule} from "@angular/core";
import {routes} from "./app.routes";
import {BrowserModule} from "@angular/platform-browser";
import {AppComponent} from "./app.component";
import {SignInUpComponent} from "./page/sign-in/sign.in.up.component";
import {RouterModule} from "@angular/router";

@NgModule({
    declarations:[
        AppComponent,
        SignInUpComponent
    ],
    imports:[
        BrowserModule,
        RouterModule.forRoot(routes)
    ],
    providers:[],
    bootstrap:[AppComponent]
})

export class AppModule{}