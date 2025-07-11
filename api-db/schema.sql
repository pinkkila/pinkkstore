drop table if exists product;

create table if not exists product
(
    id                  bigserial primary key,
    product_name        text    not null,
    product_description text    not null,
    stock_qty           integer not null,
    reserved_qty        integer not null,
    price               decimal not null
);