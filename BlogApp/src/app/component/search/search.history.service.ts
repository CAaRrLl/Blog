import { LocalStorageService, LKEY } from "../../service/localstorage.service";
import { Injectable } from "@angular/core";
import { util } from "../../tool/utils";

@Injectable()
export class HistoryCache {

    maxSize: number = 20;
    history: string[] = [];    

    constructor(private lstorage: LocalStorageService) {
        this.history = this.lstorage.get(LKEY.SEARCHHISTORY) || [];
    }
    
    add(history: string) {
        history = util.trim(history);
        if(!history) return;
        if(this.history.indexOf(history) !== -1) return;
        if(this.history.length == this.maxSize) {
            this.history.pop();
        }
        this.history.unshift(history);
        this.lstorage.set(LKEY.SEARCHHISTORY, this.history);        
    }

    del(history: string) {
        this.history = this.history.filter(val => val !== history);
        this.lstorage.set(LKEY.SEARCHHISTORY, this.history);        
    }

    filter(history?: string) {  
        if(history) {
            return this.history.filter(val => val.indexOf(history) !== -1).splice(0, 5);
        }
        return this.history.slice(0, 5);
    }

    clear() {
        this.history = [];
        this.lstorage.delete(LKEY.SEARCHHISTORY);
    }
}