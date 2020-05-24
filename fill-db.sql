TRUNCATE TABLE public.users CASCADE;
TRUNCATE TABLE public.categories CASCADE;
TRUNCATE TABLE public.offers CASCADE;

BEGIN;
INSERT INTO public.users(email, password, name, surname, avatar) VALUES
('email1@email.com', 'ad21d2a', 'name1', 'surname1', 'avatar1'),
('email2@email.com', 'ad21d3a', 'name2', 'surname2', 'avatar2');

INSERT INTO public.categories(name) VALUES
('Дом'), ('Спорт');
COMMIT;

INSERT INTO public.offers(title, price, type, description, picture, author_id)
SELECT 'title1', 100, 1, 'description1', 'picture1', user_id FROM users ORDER BY user_id LIMIT 1 OFFSET 0;
INSERT INTO public.offers(title, price, type, description, picture, author_id)
SELECT 'title2', 200, 1, 'description2', 'picture2', user_id FROM users ORDER BY user_id LIMIT 1 OFFSET 0;
INSERT INTO public.offers(title, price, type, description, picture, author_id)
SELECT 'title3', 300, 1, 'description3', 'picture3', user_id FROM users ORDER BY user_id LIMIT 1 OFFSET 1;
INSERT INTO public.offers(title, price, type, description, picture, author_id)
SELECT 'title4', 400, 1, 'description4', 'picture4', user_id FROM users ORDER BY user_id LIMIT 1 OFFSET 1;
INSERT INTO public.offers(title, price, type, description, picture, author_id)
SELECT 'title5', 500, 1, 'description5', 'picture5', user_id FROM users ORDER BY user_id LIMIT 1 OFFSET 1;

-- DECLARE
-- SELECT user_id FROM users;
-- quantity integer DEFAULT 32;
-- SELECT user_id INTO firstUserId FROM users;
-- BEGIN
-- SELECT quantity;
-- END;
--
-- CREATE OR REPLACE FUNCTION get_users() RETURNS integer AS $$
-- DECLARE
--     users integer :=20;
-- 	firstUserId RECORD;
-- BEGIN
--     RAISE NOTICE 'Сейчас quantity = %', users;  -- Выводится 30
--
--     users := 50;
--
--
--     RAISE NOTICE 'Сейчас quantity = %', users;  -- Выводится 50
--
--     RETURN firstUserId;
-- END;
-- $$ LANGUAGE plpgsql;
--
-- SELECT get_users();
