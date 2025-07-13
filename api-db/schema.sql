drop table if exists cart_row;
drop table if exists cart;
drop table if exists product;

create table if not exists product
(
    id                  bigserial primary key,
    product_name        text    not null,
    product_desc text    not null,
    stock_qty           integer not null,
    reserved_qty        integer not null,
    price               decimal not null
);

create table if not exists cart
(
    id         bigserial primary key,
    cart_price decimal not null,
    session_id text
);

create table if not exists cart_row
(
    id          bigserial primary key,
    product_qty integer not null,
    row_price   decimal not null,
    product_id  bigint  not null references product (id),
    cart_id     bigint  not null references cart (id)
);