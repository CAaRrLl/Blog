import {NgModule} from "@angular/core";
import {RouterModule} from '@angular/router';
import {InputComponent} from "./input/input.component";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { FontIconComponent } from "./fontIcon/fontIcon.component";
import { DropdownComponent } from "./dropdown/dropdown.component";

@NgModule({
    declarations:[
        InputComponent,
        FontIconComponent,
        DropdownComponent
    ],
    imports:[
        FormsModule,
        CommonModule
    ],
    providers:[],
    exports:[
        InputComponent,
        DropdownComponent,
        FontIconComponent
    ]
})

export class ComponentModule{}