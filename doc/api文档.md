### 管理员登陆
``POST``
``api/admin/login``

``params``
|字段|必选项|类型|描述|
|------|-----|-----|-----|
|account|是|String|管理员账号|
|password|是|String|管理员账号的密码|
``response``
```
成功
{
    code:1000,
    msg:"",
    data:{}
}
失败
{
    code:2001,
    msg:"账号密码不匹配",
    data:{}
}
{
    code:2002,
    msg:"账号不存在",
    data:{}
}
{
    code:2005,
    msg:"请求参数错误",
    data:{}
}
```
### 用户登陆
``POST``
``api/user/login``

``params``
|字段|必选项|类型|描述|
|------|-----|-----|-----|
|account|是|String|用户账号|
|password|是|String|用户账号的密码|
``response``
```
成功
{
    code:1000,
    msg:"",
    data:{}
}
失败
{
    code:2001,
    msg:"账号密码不匹配",
    data:{}
}
{
    code:2002,
    msg:"账号不存在",
    data:{}
}
{
    code:2005,
    msg:"请求参数错误",
    data:{}
}
```
### 用户注册
``POST``
``api/user/register``

``params``
|字段|必选项|类型|描述|
|------|-------|-----|-----|
|name|是|String|用户昵称|
|phone|是|String|用户手机号码|
|email|是|String|用户邮箱|
|password|是|String|用户密码|
``response``
```
成功
{
    code:1000,
    msg:"",
    data:{}
}
失败
{
    code:2003,
    msg:"用户已被注册",
    data:{}
}
{
    code:2005,
    msg:"请求参数错误",
    data:{}
}
```
### 管理员或用户注销
``GET``
``api/layout``
``response``
```
成功
{
    code:1000,
    msg:"",
    data:{}
}
失败
{
    code:2004,
    msg:"session不存在",
    data:{}
}
```
### 获取已发布文章列表
``GET``
``api/essay/getpublish``

``params``
|字段|必选项|类型|描述|
|------|-------|-----|-----|
|size|是|number|请求条数|
|pos|是|number|请求的位置|
|search|否|String|搜索用关键字，出现在标题或文本内容中|

``response``
```
成功
{
    code:1000,
    msg:"",
    data:{
        essays:[
            {
                id:12,
                hostid:3123,
                title:"web响应式开发",
                text:"内容靠脑补",      //只给一部分
                size:5,
                readtime:11,
                remark:"很棒",
                createtime:"2018-02-08 13:10:10.261294",
                updatetime:"2018-02-09 13:10:10.261294"
            },
             {
                id:13,
                hostid:331232,
                title:"web自适应开发",
                text:"内容靠脑补",     //只给一部分
                size:5,
                readtime:22,
                remark:"很棒",
                createtime:"2018-02-07 13:10:10.261294",
                updatetime:"2018-02-08 13:10:10.261294"
            }
        ],
        count:100
    }
}
失败
{
    code:2005,
    msg:"请求参数错误",
    data:{}
}
```
### 获取markdown格式的文章
``GET``
``api/essay/getmarkdown``

``params``
|字段|必选项|类型|描述|
|------|-------|-----|-----|
|id|是|String|文章标识符|

``response``
```
成功
{
    code:1000,
    msg:"",
    data:{
        text:'3fdfdsfdsfdsfdsfdsfdsfdsfdsfsdfsdf'
    }    
}
失败
{
    code:2005,
    msg:"请求参数错误",
    data:{}
}
{
    code:2006,
    msg:"文章不存在",
    data:{}
}
```


### 获取html格式的文章
``POST``
``api/essay/gethtml``
``params``
|字段|必选项|类型|描述|
|------|-------|-----|-----|
|id|是|String|文章标识符|

``response``
```
成功:返回对应html文件
失败
{
    code:2005,
    msg:"请求参数错误",
    data:{}
}
```

### 创建文章
``POST``
``api/eassay/new``
``params``
|字段|必选项|类型|描述|
|---|------|----|----|
|title|是|String|文章标题|
|time|是|String|文章创建时间|

``response``
```
成功
{
    code:1000,
    msg:"",
    data:{
        id:12431dasda   //文章标识符
    }
}
失败
{
    code:2005,
    msg:"请求参数错误",
    data:{}
}
```

### 获取草稿列表
``GET``
``api/eassay/draft``

``response``
```
成功
{
    code:1000,
    msg:"",
    data:{
        draftlist:[
            {
                id:'3123fdsf'
                title:'大哥了',
                text:'fsdjfklsdflksfjs',
                size:23,         
                readtime:3,           
                remark:'',          
                createtime:'2017.1.3 14:3:23',  
                updatetime:'2017.3.3 14:3:23'
            }
        ]
    }
}
```

### 保存文章
``POST``
``api/essay/save``
``params``
|字段|必选项|类型|描述|
|---|------|----|----|
|id|是|String|文章标识符|
|title|是|String|文章标题|
|essay|是|String|文章|

``response``
```
成功
{
    code:1000,
    msg:"",
    data:{}
}
失败
{
    code:2006,
    msg:"文章不存在",
    data:{}
}
{
    code:2005,
    msg:"请求参数错误",
    data:{}
}
```

### 发布文章
``GET``
``api/essay/publish``
|字段|必选项|类型|描述|
|---|------|----|----|
|id|是|String|文章标识符|
``response``
```
成功
{
    code:1000,
    msg:"",
    data:{}
}
失败
{
    code:2006,
    msg:"文章不存在",
    data:{}
}
{
    code:2005,
    msg:"请求参数错误",
    data:{}
}
```
### 删除文章
``GET``
``api/essay/delete``
|字段|必选项|类型|描述|
|---|------|----|----|
|id|是|String|文章标识符|
``response``
```
成功
{
    code:1000,
    msg:"",
    data:{}
}
失败
{
    code:2006,
    msg:"文章不存在",
    data:{}
}
{
    code:2005,
    msg:"请求参数错误",
    data:{}
}
```


##查看用户自己发布的文章
``GET``
``api/essay/mypublish``

``response``
```
成功
{
    code:1000,
    msg:'',
    data:[
        essaylist:[
            {
                id:12,
                title:"web响应式开发",
                text:"内容靠脑补",      //只给一部分
                size:5,
                readtime:11,
                remark:"很棒",
                createtime:"2018-02-08 13:10:10.261294",
                updatetime:"2018-02-09 13:10:10.261294"
            },
             {
                id:13,
                title:"web自适应开发",
                text:"内容靠脑补",     //只给一部分
                size:5,
                readtime:22,
                remark:"很棒",
                createtime:"2018-02-07 13:10:10.261294",
                updatetime:"2018-02-08 13:10:10.261294"
            }
        ]
    ]
}
```
### 查看用户自己收藏的帖子
``GET``
``api/essay/getcollection``

``response``
```
成功
{
    code:1000,
    msg:'',
    data:[
        essaylist:[
            {
                id:12,
                hostid:12123123,
                title:"web响应式开发",
                text:"内容靠脑补",      //只给一部分
                size:5,
                readtime:11,
                remark:"很棒",
                createtime:"2018-02-08 13:10:10.261294",
                updatetime:"2018-02-09 13:10:10.261294"
            },
             {
                id:13,
                hostid:12312321,
                title:"web自适应开发",
                text:"内容靠脑补",     //只给一部分
                size:5,
                readtime:22,
                remark:"很棒",
                createtime:"2018-02-07 13:10:10.261294",
                updatetime:"2018-02-08 13:10:10.261294"
            }
        ]
    ]
}
```
### 获取用户列表
``GET``
``api/get/userlist``

``response``
```
成功
{
    code:1000,
    msg:'',
    data:[
        userlist:[
            {
                id:21,
                name:急急急,
                email:23123@qq.com,
                phone:2123324324,
                portrait:dska23123lsda,
                status:1,
                level:2,
                remark:'放大时',
                createtime:"2018-02-07 13:10:10.261294",
                updatetime:"2018-02-08 13:10:10.261294"
            }
        ]
    ]
}
```

### 冻结用户
``GET``
``api/lock/user``
``params``
|字段|必选项|类型|描述|
|---|------|----|----|
|userid|是|String|用户标识符|

``response``
```
成功
{
    code:1000,
    msg:"".,
    data:{}
}
失败
{
    code:2007,
    msg:"用户不存在",
    data:{}
}
{
    code:2005,
    msg:"请求参数错误",
    data:{}
}
```