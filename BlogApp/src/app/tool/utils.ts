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
            }else if(typeof json[key] == 'string' || 'number') {
                array.push(key+'='+json[key]);
            }else{
                console.log('error:工具类 jsonToUrlParams:接收参数无法解析');
                return '';
            }
        }
        return array.join('&');
    },

    //对json按某个字段排序并返回数组
    //降序
    desc(x, y, key) {
        return y[key] - x[key];
    },
    //升序
    asc(x, y, key) {
        return x[key] - y[key];
    },
    sortJson(json, option) {
        let res = json.sort(option)
        let array = [];
        for(const key in res) {
            array.push(res[key]);
        }
        return array;
    },
    //去除字符串两端的空格
    trim(str) { 
        return str.replace(/(^\s*)|(\s*$)/g, ""); 
    },
    //去掉左边的空格
    trimleft(str) {
        return str.replace(/^\s*/g, "");
    }
}