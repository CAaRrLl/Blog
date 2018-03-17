export let util={
    //json对象转为url参数
    jsonToUrlParams(json:any):string{
        let isJson=typeof(json)=='object'
        &&Object.prototype.toString.call(json).toLowerCase()=='[object object]'
        &&!json.length;
        let array:string[]=[];
        if(!isJson){
            console.log('error:工具类 jsonToUrlParams:接收参数不为json');
            return '';
        }
        for(let key in json){
            if(Object.prototype.toString.call(json[key])=='[object Array]'){
                for(let i of json[key]){
                    array.push(key+'='+i);
                }
            }else if(typeof json[key] == 'string') {
                array.push(key+'='+json[key]);
            }else{
                console.log('error:工具类 jsonToUrlParams:接收参数无法解析');
                return '';
            }
        }
        return array.join('&');
    }
}