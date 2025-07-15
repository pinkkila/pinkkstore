drop table if exists cart_row;
drop table if exists cart;
drop table if exists product;

create table if not exists product
(
    id           bigserial primary key,
    product_name text    not null,
    product_desc text    not null,
    stock_qty    integer not null,
    reserved_qty integer not null,
    price        decimal not null
);

create table if not exists cart
(
    id            bigserial primary key,
    app_username  text      not null,
    last_modified timestamp not null
);

create table if not exists cart_item
(
    id          bigserial primary key,
    product_qty integer not null,
    product_id  bigint  not null references product (id),
    cart_id     bigint  not null references cart (id)
);