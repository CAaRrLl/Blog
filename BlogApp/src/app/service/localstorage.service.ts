import {Injectable} from '@angular/core';

@Injectable()
export class LocalStorageService {
    set(key:number|string,value:any){
        if(typeof key==='number'){
            key=String(key);
        }
        let val={data:value};
        localStorage.setItem(key,JSON.stringify(val));
    }
    get(key:number|string):any{
        if(typeof key==='number'){
            key=String(key);
        }
        let val=localStorage.getItem(key);
        if(!val) return undefined;
        return JSON.parse(val).data;
    }
    delete(key:string){
        localStorage.removeItem(key);
    }
    clear(){
        localStorage.clear();
    }
}
export enum LKEY{
    loginStatus
}