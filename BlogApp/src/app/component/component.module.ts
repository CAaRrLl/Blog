import {NgModule} from "@angular/core";
import {ComponentRouter} from './component.routes';
import {RouterModule} from '@angular/router';
import {InputComponent} from "./input/input.component";
import {MyComponent} from "./component";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { FontIconComponent } from "./fontIcon/fontIcon.component";

@NgModule({
    declarations:[
        MyComponent,
        InputComponent,
        FontIconComponent
    ],
    imports:[
        FormsModule,
        CommonModule,
        RouterModule.forChild(ComponentRouter)
    ],
    providers:[],
    exports:[
        InputComponent,
        FontIconComponent
    ]
})

export class ComponentModule{}