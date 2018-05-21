import { Component,Input, OnChanges} from "@angular/core";
import { Logger } from "../../service/logger.service";

@Component({
    selector: 'app-select',
    templateUrl: './select.component.html',
    styleUrls: ['./select.component.scss']
})

export class SelectComponent implements OnChanges{
    @Input() model: SelectModel = {options: [], value: ''};

    constructor(private log: Logger) {}

    ngOnChanges() {

    }

    doSelect(target) {
        if(target.options) {
            this.log.debug('SelectComponent', 'deSelect', {'选择': target.options});
            let options = target.options;
            let selectedIndex = options.selectedIndex;
            this.model.value = options[selectedIndex].id;
        }
    }

    isSelected(id) {
        if(id === this.model.value) {
            return true;
        }
        return false;
    }
}

export interface SelectModel {
    options: Array<Option>;
    value: string; 
}
export interface Option {
    id: string;
    name: string;
}