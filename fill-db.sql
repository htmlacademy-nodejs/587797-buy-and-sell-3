-- Function for encrypting primary key
CREATE OR REPLACE FUNCTION pseudo_encrypt(VALUE int) returns int AS $$
DECLARE
l1 int;
l2 int;
r1 int;
r2 int;
i int:=0;
BEGIN
 l1:= (VALUE >> 16) & 65535;
 r1:= VALUE & 65535;
 WHILE i < 3 LOOP
   l2 := r1;
   r2 := l1 # ((((1366 * r1 + 150889) % 714025) / 714025.0) * 32767)::int;
   l1 := l2;
   r1 := r2;
   i := i + 1;
 END LOOP;
 RETURN ((r1 << 16) + l1);
END;
$$ LANGUAGE plpgsql strict immutable;

TRUNCATE TABLE public.users CASCADE;
TRUNCATE TABLE public.categories CASCADE;
TRUNCATE TABLE public.offers CASCADE;

INSERT INTO public.users(user_id, email, password, name, surname, avatar) VALUES
(pseudo_encrypt(1), 'email1@email.com', 'ad21d2a', 'name1', 'surname1', 'avatar1'),
(pseudo_encrypt(2), 'email2@email.com', 'ad21d3a', 'name2', 'surname2', 'avatar2'),
(pseudo_encrypt(3), 'email3@email.com', 'ad21d4a', 'name3', 'surname3', 'avatar3'),
(pseudo_encrypt(4), 'email4@email.com', 'ad21d5a', 'name4', 'surname4', 'avatar4');

INSERT INTO public.categories(category_id, name) VALUES
(pseudo_encrypt(1), 'Дом'),
(pseudo_encrypt(2), 'Спорт');

INSERT INTO public.offers(offer_id, title, price, type, description, picture, author_id) VALUES
(pseudo_encrypt(1), 'title1', 100, 1, 'description1', 'picture1', pseudo_encrypt(1)),
(pseudo_encrypt(2), 'title2', 200, 1, 'description2', 'picture2', pseudo_encrypt(2)),
(pseudo_encrypt(3), 'title3', 300, 1, 'description3', 'picture3', pseudo_encrypt(1)),
(pseudo_encrypt(4), 'title4', 400, 1, 'description4', 'picture4', pseudo_encrypt(2)),
(pseudo_encrypt(5), 'title5', 500, 1, 'description5', 'picture5', pseudo_encrypt(2));

INSERT INTO public.offers_comments(text, offer_id, author_id) VALUES
('text1',  pseudo_encrypt(1), pseudo_encrypt(3)),
('text2',  pseudo_encrypt(1), pseudo_encrypt(4)),
('text3',  pseudo_encrypt(2), pseudo_encrypt(3)),
('text4',  pseudo_encrypt(2), pseudo_encrypt(4)),
('text5',  pseudo_encrypt(3), pseudo_encrypt(3)),
('text6',  pseudo_encrypt(3), pseudo_encrypt(4)),
('text7',  pseudo_encrypt(4), pseudo_encrypt(3)),
('text8',  pseudo_encrypt(4), pseudo_encrypt(4)),
('text9',  pseudo_encrypt(5), pseudo_encrypt(3)),
('text10', pseudo_encrypt(5), pseudo_encrypt(4));

INSERT INTO public.offers_categories(offer_id, category_id) VALUES
(pseudo_encrypt(1), pseudo_encrypt(1)),
(pseudo_encrypt(2), pseudo_encrypt(2)),
(pseudo_encrypt(3), pseudo_encrypt(1)),
(pseudo_encrypt(3), pseudo_encrypt(2)),
(pseudo_encrypt(4), pseudo_encrypt(1)),
(pseudo_encrypt(4), pseudo_encrypt(2)),
(pseudo_encrypt(5), pseudo_encrypt(1)),
(pseudo_encrypt(5), pseudo_encrypt(2));
