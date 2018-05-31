import { Injectable } from '@angular/core';

@Injectable()
export class SessionStorage{
    private keyDeal(key):string {
        if(typeof key === 'number'){
            return key.toString();
        }
        return key;
    }
    set(key: number | string, value: any){
        key = this.keyDeal(key);
        let val = {data: value};
        sessionStorage.setItem(key, JSON.stringify(val));
    }
    get(key: number | string):any{
        key = this.keyDeal(key);
        let val = sessionStorage.getItem(key);
        if(!val) return undefined;
        return JSON.parse(val)['data'];
    }
    delete(key: string | number){
        key = this.keyDeal(key);
        sessionStorage.removeItem(key);
    }
    has(key: string | number) {
        return this.get(key)? true : false;
    }
    clear(){
        sessionStorage.clear();
    }
    
}
export enum KEY {
    READER_ESSAYID,
    MYHOMECP_USERINFO,
    MYHOMECP_USERDATASUM,
    MYESSAYCP_ACTIVETAG
}