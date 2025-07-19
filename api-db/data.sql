delete
from order_item;

delete
from customer_order;

delete
from product;

delete
from category;

insert into category(id, category_name)
values (1, 'pictures');

insert into product(id, product_name, product_desc, stock_qty, reserved_qty, price, category_id)
values (99, 'Banana poster', 'Really beautiful picture of banana', 45, 0, 19.95, 1),
       (100, 'Orange poster', 'Amazing potret of an orange', 66, 0, 24.95, 1);

insert into customer_order(id, app_username, order_date, total_price)
values (50, 'user', '2025-01-28T17:23:19', 69.85);

insert into order_item(id, product_qty, product_price, product_id, customer_order_id)
values (200, 1, 19.95, 99, 50),
        (201, 2, 24.95, 100, 50);

SELECT setval('category_id_seq', (SELECT MAX(id) from category));
SELECT setval('product_id_seq', (SELECT MAX(id) from product));
SELECT setval('public.cart_id_seq', (SELECT MAX(id) from cart));
SELECT setval('public.cart_item_id_seq', (SELECT MAX(id) from cart_item));
SELECT setval('public.customer_order_id_seq', (SELECT MAX(id) from customer_order));
SELECT setval('public.order_item_id_seq', (SELECT MAX(id) from public.order_item));

