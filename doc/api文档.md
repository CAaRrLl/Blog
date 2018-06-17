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
    code:1000,z
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
{
    code:2005,
    msg:"数据库错误",
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

``params``
|字段|必选项|类型|描述|
|------|-------|-----|-----|
|size|是|number|请求条数|
|pos|是|number|请求的位置|
|search|否|String|搜索用关键字，出现在标题或文本内容中|
|self|否|boolean|是否获取用户自己的文章|
|tag|否|String|标签id|

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
                hostname:"得到",
                hosthead: ''
                title:"web响应式开发",
                text:"内容靠脑补",    
                size:5,
                readtime:11,
                collected: 2,
                remark:"很棒",
                msg: 10,
                imgUrl: '',
                createtime:1512123213123,
                updatetime:1512123213123
            },
             {
                id:12,
                hostid:3123,
                hostname:"得到",
                hosthead:""
                title:"web响应式开发",
                text:"内容靠脑补",    
                size:5,
                readtime:11,
                collected: 2,
                remark:"很棒",
                msg: 10,
                imgUrl: '',
                createtime:1512123213123,
                updatetime:1512123213123
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
        id:12,
        title:"web响应式开发",
        text:"内容靠脑补",    
        size:5,
        readtime:11,
        remark:"很棒",
        createtime:1512123213123,
        updatetime:1512123213123
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
``api/essay/new``
``params``
|字段|必选项|类型|描述|
|---|------|----|----|
|title|是|String|文章标题|
|tagid|是|String|文章分类|

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

### 删除文章
``GET``
``api/essay/delete``
``params``
|字段|必选项|类型|描述|
|---|------|----|----|
|essayid|是|String|文章分类|

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
    code:2005,
    msg:"请求参数错误",
    data:{}
}
```

### 新建标签
``GET``
``api/essay/newtag``
``params``
|字段|必选项|类型|描述|
|---|------|----|----|
|tag|是|String|文章分类|

``response``
```
成功
{
    code:1000,
    msg:"",
    data:{
        id: 12
    }
}
失败
{
    code:2005,
    msg:"请求参数错误",
    data:{}
}
```

### 修改标签
``GET``
``api/essay/modifytag``
``params``
|字段|必选项|类型|描述|
|---|------|----|----|
|tagid|是|String|文章分类|
|tag|是|String|文章分类|

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
    code:2005,
    msg:"请求参数错误",
    data:{}
}
```

### 删除标签
``GET``
``api/essay/deletetag``
``params``
|字段|必选项|类型|描述|
|---|------|----|----|
|tagid|是|String|文章分类|

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
    code:2005,
    msg:"请求参数错误",
    data:{}
}
```

### 获取标签
``GET``
``api/essay/tag``
``params``
|字段|必选项|类型|描述|
|---|------|----|----|
|attach|否|boolean|是否返回标签附带的其他信息|

``attach == 0``
``response``
```
成功
{
    code:1000,
    msg:"",
    data:{
        taglist:[
            {id:1,tag:'随笔'},
            {id:2,tag:'css学习笔记'}
        ]
    }
}
```

``attach == 1``
``response``
```
成功
{
    code:1000,
    msg:"",
    data:{
        taglist:[
            {id:1,tag:'随笔'},
            {id:2,tag:'css学习笔记'}
        ],
        essaytaglist:[
            {id: 12, title: 'css学习笔记一',status: 1},
            {id: 13, title: 'css学习笔记二',status: 1}
        ],
        firstessay:{
            id:12,
            title:"web响应式开发",
            text:"内容靠脑补",    
            size:5,
            readtime:11,
            remark:"很棒",
            createtime:1512123213123,
            updatetime:1512123213123
        }        
    }
}
```

### 获取标签下的文章标签
``GET``
``api/essay/essaytag``
|字段|必选项|类型|描述|
|---|------|----|----|
|tagid|是|string|标签id|
|attach|否|boolean|是否返回标签附带的其他信息|

``attach == 0``
``response``
```
成功
{
    code:1000,
    msg:"",
    data:{
        essaytaglist:[
            {id: 12, title: 'css学习笔记一'},
            {id: 13, title: 'css学习笔记二'}
        ]
    }
}
```

``attach == 1``
``response``
```
成功
{
    code:1000,
    msg:"",
    data:{
        essaytaglist:[
            {id: 12, title: 'css学习笔记一'},
            {id: 13, title: 'css学习笔记二'}
        ],
        firstessay:{
            id:12,
            title:"web响应式开发",
            text:"内容靠脑补",    
            size:5,
            readtime:11,
            remark:"很棒",
            createtime:1512123213123,
            updatetime:1512123213123
        }        
    }
}
```


### 获取草稿列表
``GET``
``api/essay/draft``

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
                createtime:1512123213123,  
                updatetime:1512123213123
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
|text|是|String|文章|

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

### 设置文章标签
``GET``
``api/essay/settag``
``params``
|字段|必选项|类型|描述|
|---|------|----|----|
|id|是|String|文章标识符|
|tagid|是|String|标签标识符|

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
    code:2008,
    msg:"没有权限",
    data:{}
}
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
                text:"内容靠脑补",    
                size:5,
                readtime:11,
                remark:"很棒",
                createtime:1523242343232,
                updatetime:1523242343232
            },
             {
                id:13,
                title:"web自适应开发",
                text:"内容靠脑补",   
                size:5,
                readtime:22,
                remark:"很棒",
                createtime:1523242343232,
                updatetime:1523242343232
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
                text:"内容靠脑补",    
                size:5,
                readtime:11,
                msg: 1,
                collected: 1,
                remark:"很棒",
                createtime:1523242343232,
                updatetime:1523242343232
            },
             {
                id:13,
                hostid:12312321,
                title:"web自适应开发",
                text:"内容靠脑补",   
                size:5,
                readtime:22,
                msg: 1,
                collected: 1,
                remark:"很棒",
                createtime:1523242343232,
                updatetime:1523242343232
            }
        ]
    ]
}
```

### 提交文件
``POST``
``api/file/upload``
```参数：FormData{name, value}```

``response``
```
成功
{
    code:1000,
    msg:'',
    data:{
        files:[
            {
                id:21,
                name:急急急
            },
            {
                id:22,
                name:急急急
            }
        ]
    }
}
失败
{
    code:2005,
    msg:"请求参数错误",
    data:{}
}
```

### 获取静态文件
``GET``
``api/file/get``
|字段|必选项|类型|描述|
|---|------|----|----|
|id|是|String|文件标识符|

### 获取用户列表
``GET``
``api/userlist``

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
                createtime:1523242343232,
                updatetime:1523242343232
            }
        ]
    ]
}
```

### 获取个人信息
``GET``
``api/user/info``

``response``
```
成功
{
    code:1000,
    msg:'',
    data:{
        name:急急急,
        email:23123@qq.com,
        phone:2123324324,
        portrait:dska23123lsda,
        level:2,
        remark:'放大时',
        createtime:1523242343232,
        updatetime:1523242343232
    }
}
```

### 保存个人信息
``POST``
``api/user/info/save``
|字段|必选项|类型|描述|
|---|------|----|----|
|portrait|否|String|头像|
|name|否|String|文件标识符|
|remark|否|String|文件标识符|
至少要有一个参数

``response``
```
成功
{
    code:1000,
    msg:'',
    data:{}
}
失败
{
    code:2005,
    msg:"请求参数错误",
    data:{}
}
```

### 添加一条留言
``POST``
``api/user/comment``
|字段|必选项|类型|描述|
|---|------|----|----|
|essayid|是|String|文章id|
|text|是|String|留言内容|

``response``
```
成功
{
    code:1000,
    msg:'',
    data:{
        id: 121
    }
}
失败
{
    code:2005,
    msg:"请求参数错误",
    data:{}
}
```

### 删除一条留言
``POST``
``api/user/comment/del``
|字段|必选项|类型|描述|
|---|------|----|----|
|id|是|String|留言id|

``response``
```
成功
{
    code:1000,
    msg:'',
    data:{}
}
失败
{
    code:2005,
    msg:"请求参数错误",
    data:{}
}
```

### 添加一条回复
``POST``
``api/user/reply``
|字段|必选项|类型|描述|
|---|------|----|----|
|commentid|是|String|留言id|
|recvid|是|String|接收者id|
|text|是|String|留言内容|

``response``
```
成功
{
    code:1000,
    msg:'',
    data:{
        id: 121
    }
}
失败
{
    code:2005,
    msg:"请求参数错误",
    data:{}
}
```

### 删除一条回复
``POST``
``api/user/reply/del``
|字段|必选项|类型|描述|
|---|------|----|----|
|id|是|String|回复id|

``response``
```
成功
{
    code:1000,
    msg:'',
    data:{}
}
失败
{
    code:2005,
    msg:"请求参数错误",
    data:{}
}
```

### 获取某文章下面的留言和回复
``GET``
``api/essay/comments``
|字段|必选项|类型|描述|
|---|------|----|----|
|id|是|String|文章id|
|page|是|number|页码|
|size|是|number|页的大小|

``response``
```
成功
{
    code:1000,
    msg:'',
    data:{
        comments: [
            {
                id: 12,
                portrait:'foisfsdjfksfklsd',
                sendid: 12,
                name: '大哥大',
                time: 1223232323,
                text: '附件是复临凡看来是开始了棱角分明珀尔',
                support: 12,
                replys: [
                    {
                        id: 321,
                        name: '顶顶顶',
                        time: 232434231,
                        sendid: 13,
                        recvid: 312,
                        text: '的快捷方式进口潘克拉斯反馈到i爱父母都是卡夫卡'
                    }
                ]
            }
        ],
        count: 100
    }
}
失败
{
    code:2005,
    msg:"请求参数错误",
    data:{}
}
```

### 文章阅读
``GET``
``api/essay/read``
|字段|必选项|类型|描述|
|---|------|----|----|
|id|是|String|文章id|
``response``

```
成功
{
    code:1000,
    msg:'',
    data:{}
}
失败
{
    code:2005,
    msg:"请求参数错误",
    data:{}
}
```

### 收藏文章
``GET``
``api/essay/collection``
|字段|必选项|类型|描述|
|---|------|----|----|
|id|是|String|文章id|
``response``

```
成功
{
    code:1000,
    msg:'',
    data:{}
}
失败
{
    code:2005,
    msg:"请求参数错误",
    data:{}
}
```

### 判断用户是否收藏了文章
``GET``
``api/essay/iscollected``
|字段|必选项|类型|描述|
|---|------|----|----|
|id|是|String|文章id|
``response``

```
成功
{
    code:1000,
    msg:'',
    data:{
        iscollected: true;
    }
}
失败
{
    code:2005,
    msg:"请求参数错误",
    data:{}
}
```

### 获取用户统计信息
``GET``
``api/user/dataSum``

``response``

```
成功
{
    code:1000,
    msg:'',
    data:{
        follow : 11;
        follower : 12;
        essay : 23;
        wordnum : 1212133;
        collected : 8;
    }
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