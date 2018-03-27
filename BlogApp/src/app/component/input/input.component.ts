import {Component,Input,Output, ElementRef,EventEmitter,ViewChild} from "@angular/core";
import {InputJson} from '../component.interface';
import { OnChanges } from "@angular/core/src/metadata/lifecycle_hooks";
import { Logger } from "../../service/logger.service";

@Component({
    selector:'app-input',
    styleUrls:['./input.component.scss'],
    templateUrl:'./input.component.html'
})

export class InputComponent implements OnChanges{
    @Input() view = new InputJson();
    @Output() validChange = new EventEmitter<boolean>();
    @ViewChild('tip') tooltip:ElementRef;
    tipShow:boolean=false;
    invalidTip:string;
    constructor(private log:Logger,private el:ElementRef){}
    ngOnChanges(){
        for(let i=0;i<this.view.frame.length;i++){
            if(!this.checkValid(i)) break;
        }
    }
    showValidTip(id:number){
        this.invalidTip=this.view.frame[id].openCheck.errorTip;
        this.tipShow=true;
        setTimeout(()=>{
            if(!this.tooltip){
                this.log.warn('inputComponent','showVaildTip','tooltip undefined or null');
                return;
            }
            let cell=this.el.nativeElement.querySelector('#_'+id);
            if(!cell){
                this.log.warn('inputComponent','showVaildTip','get ElementRef failed');
                return;
            }
            cell.appendChild(this.tooltip.nativeElement);           
        },0);
    }
    checkValid(id:number):boolean{
        if(!this.view) return;
        if(!this.view.frame[id].openCheck) return;
        let pattern:RegExp=this.view.frame[id].openCheck.regExp; //正则表达式  
        let content=this.view.frame[id].content; //验证内容  
        let res:any; //验证结果  
        if(!(pattern instanceof RegExp)) return;
        res=pattern.exec(content);
        if(res==null){
            this.view.frame[id].openCheck.isValid=false;    //该input内容不合法
            this.showValidTip(id);
            this.validChange.emit(false);
            return false
        }
        this.view.frame[id].openCheck.isValid=true;     //该input内容合法
        this.tipShow=false;
        if(this.checkAllVaild()){
            this.log.debug('inputComponent','checkValid','input group合法');
            this.validChange.emit(true);
        }
        return true;
    }
    checkAllVaild():boolean{
        let res:boolean=true;
        for(let frame of this.view.frame){
            if(!frame.openCheck) continue;
            if(!frame.openCheck.isValid){
                res=false;
                break;
            }
        }   
        return res; 
    }
    showFirstValidTip(){
        for(let i=0;i<this.view.frame.length;i++){
            if(this.view.frame[i].openCheck&&
            !this.view.frame[i].openCheck.isValid){
                this.showValidTip(i);
                break;
            }
        }
    }
}