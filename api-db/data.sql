delete from product;

insert into product(id, product_name, product_desc, stock_qty, reserved_qty, price)
values (99, 'banana poster', 'Really beautiful picture of bananaj', 45, 0, 19.95);

-- insert into cart(id, cart_price, session_id)
-- values (199, 39.90, 12345);
--
-- insert into cart_row(id, product_qty, row_price, product_id, cart_id)
-- values (299, 2, 39.90, 99, 199);

SELECT setval('product_id_seq', (SELECT MAX(id) from product));
SELECT setval('public.cart_id_seq', (SELECT MAX(id) from cart));
SELECT setval('public.cart_row_id_seq', (SELECT MAX(id) from cart_row));
