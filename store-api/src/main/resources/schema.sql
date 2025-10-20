drop table if exists cart_item;
drop table if exists cart;
drop table if exists order_item;
drop table if exists customer_order;
drop table if exists payment;
drop table if exists product;
drop table if exists category;
drop table if exists account;

create table if not exists category
(
    id            bigserial primary key,
    category_name text not null
);

create table if not exists product
(
    id           bigserial primary key,
    product_name text    not null,
    product_desc text    not null,
    image_url    text    not null,
    stock_qty    integer not null,
    reserved_qty integer not null,
    price        decimal not null,
    popularity   integer not null,
    category_id  bigint  not null references category (id)
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

create table if not exists payment
(
    id     bigserial primary key,
    amount decimal not null
);

create table if not exists customer_order
(
    id           bigserial primary key,
    app_username text      not null,
    order_date   timestamp not null,
    total_price  decimal   not null,
    payment_id   bigint    not null references payment (id)
);

create table if not exists order_item
(
    id                bigserial primary key,
    product_qty       integer not null,
    product_order_price     decimal not null,
    product_id        bigint  not null references product (id),
    customer_order_id bigint  not null references customer_order (id)
);

create table if not exists account
(
    id bigserial primary key,
    app_username text not null,
    coins decimal not null
)