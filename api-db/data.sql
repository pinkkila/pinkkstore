delete
from order_item;

delete
from customer_order;

delete
from product;

delete
from category;

delete
from account;

insert into category(id, category_name)
values (1, 'pictures');

insert into product(id, product_name, product_desc, image_url, stock_qty, reserved_qty, price, popularity, category_id)
values (99, 'Banana poster', 'Really beautiful picture of banana', 'imageUrl', 15, 0, 19.95, 88, 1),
       (100, 'Orange poster', 'Amazing potret of an orange', 'imageUrl', 66, 0, 24.95, 70, 1);

insert into customer_order(id, app_username, order_date, total_price)
values (50, 'user', '2025-01-28T17:23:19', 69.85);

insert into order_item(id, product_qty, product_price, product_id, customer_order_id)
values (200, 1, 19.95, 99, 50),
       (201, 2, 24.95, 100, 50);

insert into account(id, app_username, coins)
values (1, 'user', 100.00);


-- Reset sequences to the max ID values (or 1 if table is empty)
SELECT setval('public.category_id_seq', COALESCE((SELECT MAX(id) FROM public.category), 1), false);
SELECT setval('public.product_id_seq', COALESCE((SELECT MAX(id) FROM public.product), 1), false);
SELECT setval('public.cart_id_seq', COALESCE((SELECT MAX(id) FROM public.cart), 1), false);
SELECT setval('public.cart_item_id_seq', COALESCE((SELECT MAX(id) FROM public.cart_item), 1), false);
SELECT setval('public.customer_order_id_seq', COALESCE((SELECT MAX(id) FROM public.customer_order), 1), false);
SELECT setval('public.order_item_id_seq', COALESCE((SELECT MAX(id) FROM public.order_item), 1), false);
SELECT setval('public.account_id_seq', COALESCE((SELECT MAX(id) FROM public.account), 1), false);

