var table=`
create table if not exists fileinfo(
    id varchar(50) primary key,
    filename varchar(20),  
    uploader varchar(20),  
    uploadtime datetime           
)`;
exports.table=table;