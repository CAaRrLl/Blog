import { Component, Renderer2} from "@angular/core";
import { OnInit, OnChanges } from "@angular/core/src/metadata/lifecycle_hooks";
import { SiderbarService, SiderbarModel } from "./siderbar.service";
import { Observable } from 'rxjs/Rx';

@Component({
    selector: 'app-siderbar',
    templateUrl: './siderbar.component.html',
    styleUrls: ['./siderbar.component.scss']
})

export class SiderbarComponent{

    model: SiderbarModel;

    hidden: boolean = true;

    constructor(private siderbar: SiderbarService, private render: Renderer2) {
        this.siderbar.getObservable().subscribe((model) => {
            this.model = model;
        });
    }

    closeSiderbar() {
        this.model.hidden = true;
    }
}