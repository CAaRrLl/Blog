import {NgModule} from "@angular/core";
import {RouterModule} from '@angular/router';
import {InputComponent} from "./input/input.component";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { FontIconComponent } from "./fontIcon/fontIcon.component";
import { DropdownComponent } from "./dropdown/dropdown.component";
import { AlertComponent } from "./alert/alert.component";
import { SearchComponent } from "./search/search.component";
import { DialogComponent } from "./dialog/dialog.component";
import { SiderbarComponent } from "./sidebar.component/siderbar.component";
import { InsertImgComponent } from "../user/component/insert-img/insert.img";
import { ModifyComponent } from "../user/component/modify.component/modify.component";
import { SelectComponent } from "./select.component/select.component";

@NgModule({
    declarations:[
        InputComponent,
        FontIconComponent,
        DropdownComponent,
        AlertComponent,
        SearchComponent,
        DialogComponent,
        SiderbarComponent,
        InsertImgComponent,
        ModifyComponent,
        SelectComponent
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
        SearchComponent,
        DialogComponent,
        SiderbarComponent
    ],
    entryComponents: [
        InsertImgComponent,
        ModifyComponent,
        SelectComponent
    ]
})

export class ComponentModule{}