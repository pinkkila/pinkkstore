delete from app_user;

insert into app_user (id, username, password)
values (23, 'user', '$2a$10$gGorJOAjOgQyY3AeLrQdZO51CoDUPRcNbAngcfrC6JORudNjZKgqq'); --password is password

SELECT setval('app_user_id_seq', (SELECT MAX(id) FROM app_user));