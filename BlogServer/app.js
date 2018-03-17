var express=require('express');
var app=express();

app.get('/',function(req,res){
    res.send('Hello World');
})

app.post('/api/frontlog',function(req,res){
    res.header('Access-Control-Allow-Origin','*');
    console.log(req);
    res.writeHead('200',{'Content-Type':'text/plain'});
    res.end('get');
})

var server=app.listen(3200,function(){
    var host=server.address().address;
    var port=server.address().port;

    console.log('Example app listening at http://%s:%s',host,port);
})