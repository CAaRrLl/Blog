interface viewJson{
    readonly component:string;
}

interface Frame{

}

interface inputFrame extends Frame{
    content:string;
    placeholder:string;
    type:string;
    icon:string;
    readonly?:boolean;
    openCheck?:{
        regExp:RegExp;
        errorTip:string;
        isValid:boolean;
    };
}

export class InputJson implements viewJson{
    component:'input';
    frame:inputFrame[]=[];
}