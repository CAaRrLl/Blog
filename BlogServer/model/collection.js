var db=require('../common/db');
var logger=require('../common/logger').logger;



var table=`
create table if not exists collection(
    account varchar(20) not null,    
    id int not null                
)`;
exports.table=table;