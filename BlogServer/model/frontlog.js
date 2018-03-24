var table=`
create table if not exists frontlog(
    id int auto_increment primary key,
    level varchar(10) not null,   
    pos varchar(100) not null,          
    define varchar(100),                  
    createtime datetime not null              
)`;
exports.table=table;