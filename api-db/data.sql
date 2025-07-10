delete from product;

insert into product(id, product_name, product_description, stock_qty, reserved_qty, price)
values (99, 'banana poster', 'Really beautiful picture of bananaj', 45, 0, 19.95);

SELECT setval('product_id_seq', (SELECT MAX(id) from product));