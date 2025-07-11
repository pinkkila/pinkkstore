delete from app_user;

insert into app_user (id, username, password)
values (23, 'user', '{noop}password');

SELECT setval('app_user_id_seq', (SELECT MAX(id) FROM app_user));