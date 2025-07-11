drop table if exists app_user;

create table if not exists app_user
(
    id       bigserial primary key,
    username text not null,
    password text not null
);