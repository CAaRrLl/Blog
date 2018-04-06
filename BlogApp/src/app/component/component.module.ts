import {NgModule} from "@angular/core";
import {RouterModule} from '@angular/router';
import {InputComponent} from "./input/input.component";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { FontIconComponent } from "./fontIcon/fontIcon.component";
import { DropdownComponent } from "./dropdown/dropdown.component";
import { AlertComponent } from "./alert/alert.component";
import { SearchComponent } from "./search/search.component";

@NgModule({
    declarations:[
        InputComponent,
        FontIconComponent,
        DropdownComponent,
        AlertComponent,
        SearchComponent
    ],
    imports:[
        FormsModule,
        CommonModule
    ],
    providers:[],
    exports:[
        InputComponent,
        DropdownComponent,
        FontIconComponent,
        AlertComponent,
        SearchComponent
    ]
})

export class ComponentModule{}