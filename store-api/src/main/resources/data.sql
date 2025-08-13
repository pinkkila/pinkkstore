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
values (1, 'fruits'),
       (2, 'animals'),
       (3, 'nature');

insert into product(id, product_name, product_desc, image_url, stock_qty, reserved_qty, price, popularity, category_id)
values (99, 'Banana', 'Really beautiful picture of banana', '/images/banana.jpg', 15, 0, 19.95, 88, 1),
       (100, 'Orange', 'Amazing potret of an orange', '/images/orange.jpg', 66, 0, 24.95, 70, 1),
       (101, 'Dog', 'Quite amazing picture of the dog', '/images/dog.jpg', 30, 0, 9.95, 80, 2),
       (102, 'Cat', 'This is the Cat', '/images/cat.jpg', 99, 0, 39.90, 99, 2),
       (103, 'Desert', 'More sand that you can handle.', '/images/desert.jpg',48, 0, 13.95, 23, 3 ),
       (104, 'Jungle', 'Only book is missing from this Jungle', '/images/jungle.jpg', 23, 0, 89.49, 10, 3),
       (105, 'Spring', 'Spring comes after winter', '/images/spring.jpg', 11, 0, 79.95, 40, 3);

insert into customer_order(id, app_username, order_date, total_price)
values (50, 'user', '2025-01-28T17:23:19', 69.85);

insert into order_item(id, product_qty, product_price, product_id, customer_order_id)
values (200, 1, 19.95, 99, 50),
       (201, 2, 24.95, 100, 50);

insert into account(id, app_username, coins)
values (1, 'user', 100.00);


SELECT setval('category_id_seq', (SELECT MAX(id) FROM category));
SELECT setval('product_id_seq', (SELECT MAX(id) FROM product));
SELECT setval('cart_id_seq', (SELECT MAX(id) FROM cart));
SELECT setval('cart_item_id_seq', (SELECT MAX(id) FROM cart_item));
SELECT setval('customer_order_id_seq', (SELECT MAX(id) FROM customer_order));
SELECT setval('order_item_id_seq', (SELECT MAX(id) FROM order_item));
SELECT setval('account_id_seq', (SELECT MAX(id) FROM account));
