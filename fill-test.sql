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
TRUNCATE TABLE public.offers_comments CASCADE;
TRUNCATE TABLE public.offers_categories CASCADE;

INSERT INTO public.users(user_id, email, password, name, surname, avatar) VALUES(
pseudo_encrypt(1),testPassword1,testName1,testSurname1,testAvatar1),
(pseudo_encrypt(2),testPassword2,testName2,testSurname2,testAvatar2),
(pseudo_encrypt(3),testPassword3,testName3,testSurname3,testAvatar3),
(pseudo_encrypt(4),testPassword4,testName4,testSurname4,testAvatar4),
(pseudo_encrypt(5),testPassword5,testName5,testSurname5,testAvatar5)

INSERT INTO public.categories(category_id, name) VALUES(
pseudo_encrypt(1),name1),
(pseudo_encrypt(2),name2),
(pseudo_encrypt(3),name3),
(pseudo_encrypt(4),name4),
(pseudo_encrypt(5),name5)

INSERT INTO public.offers(offer_id, title, price, type, description, picture, author_id) VALUES(
pseudo_encrypt(1),testPassword1,testName1,testSurname1,testAvatar1,pseudo_encrypt(4)),
(pseudo_encrypt(2),testPassword2,testName2,testSurname2,testAvatar2,pseudo_encrypt(3)),
(pseudo_encrypt(3),testPassword3,testName3,testSurname3,testAvatar3,pseudo_encrypt(2)),
(pseudo_encrypt(4),testPassword4,testName4,testSurname4,testAvatar4,pseudo_encrypt(3)),
(pseudo_encrypt(5),testPassword5,testName5,testSurname5,testAvatar5,pseudo_encrypt(4)),
(pseudo_encrypt(6),testPassword6,testName6,testSurname6,testAvatar6,pseudo_encrypt(4)),
(pseudo_encrypt(7),testPassword7,testName7,testSurname7,testAvatar7,pseudo_encrypt(2)),
(pseudo_encrypt(8),testPassword8,testName8,testSurname8,testAvatar8,pseudo_encrypt(5)),
(pseudo_encrypt(9),testPassword9,testName9,testSurname9,testAvatar9,pseudo_encrypt(3)),
(pseudo_encrypt(10),testPassword10,testName10,testSurname10,testAvatar10,pseudo_encrypt(1))

INSERT INTO public.offers_comments(text, offer_id, author_id) VALUES
(pseudo_encrypt(1),testText1,pseudo_encrypt(undefined),pseudo_encrypt(undefined)),
(pseudo_encrypt(2),testText2,pseudo_encrypt(undefined),pseudo_encrypt(undefined)),
(pseudo_encrypt(3),testText3,pseudo_encrypt(undefined),pseudo_encrypt(undefined)),
(pseudo_encrypt(4),testText4,pseudo_encrypt(undefined),pseudo_encrypt(undefined)),
(pseudo_encrypt(5),testText5,pseudo_encrypt(undefined),pseudo_encrypt(undefined)),
(pseudo_encrypt(6),testText6,pseudo_encrypt(undefined),pseudo_encrypt(undefined)),
(pseudo_encrypt(7),testText7,pseudo_encrypt(undefined),pseudo_encrypt(undefined)),
(pseudo_encrypt(8),testText8,pseudo_encrypt(undefined),pseudo_encrypt(undefined)),
(pseudo_encrypt(9),testText9,pseudo_encrypt(undefined),pseudo_encrypt(undefined)),
(pseudo_encrypt(10),testText10,pseudo_encrypt(undefined),pseudo_encrypt(undefined)),
(pseudo_encrypt(11),testText11,pseudo_encrypt(undefined),pseudo_encrypt(undefined)),
(pseudo_encrypt(12),testText12,pseudo_encrypt(undefined),pseudo_encrypt(undefined)),
(pseudo_encrypt(13),testText13,pseudo_encrypt(undefined),pseudo_encrypt(undefined)),
(pseudo_encrypt(14),testText14,pseudo_encrypt(undefined),pseudo_encrypt(undefined)),
(pseudo_encrypt(15),testText15,pseudo_encrypt(undefined),pseudo_encrypt(undefined)),
(pseudo_encrypt(16),testText16,pseudo_encrypt(undefined),pseudo_encrypt(undefined)),
(pseudo_encrypt(17),testText17,pseudo_encrypt(undefined),pseudo_encrypt(undefined)),
(pseudo_encrypt(18),testText18,pseudo_encrypt(undefined),pseudo_encrypt(undefined)),
(pseudo_encrypt(19),testText19,pseudo_encrypt(undefined),pseudo_encrypt(undefined)),
(pseudo_encrypt(20),testText20,pseudo_encrypt(undefined),pseudo_encrypt(undefined))

INSERT INTO public.offers_categories(offer_id, category_id) VALUES(
pseudo_encrypt(1),pseudo_encrypt(3)),
(pseudo_encrypt(1),pseudo_encrypt(2)),
(pseudo_encrypt(1),pseudo_encrypt(4)),
(pseudo_encrypt(1),pseudo_encrypt(1)),
(pseudo_encrypt(1),pseudo_encrypt(5)),
(pseudo_encrypt(2),pseudo_encrypt(1)),
(pseudo_encrypt(2),pseudo_encrypt(4)),
(pseudo_encrypt(2),pseudo_encrypt(2)),
(pseudo_encrypt(2),pseudo_encrypt(3)),
(pseudo_encrypt(2),pseudo_encrypt(5)),
(pseudo_encrypt(3),pseudo_encrypt(5)),
(pseudo_encrypt(3),pseudo_encrypt(4)),
(pseudo_encrypt(3),pseudo_encrypt(2)),
(pseudo_encrypt(3),pseudo_encrypt(1)),
(pseudo_encrypt(3),pseudo_encrypt(3)),
(pseudo_encrypt(4),pseudo_encrypt(5)),
(pseudo_encrypt(4),pseudo_encrypt(1)),
(pseudo_encrypt(4),pseudo_encrypt(3)),
(pseudo_encrypt(4),pseudo_encrypt(2)),
(pseudo_encrypt(4),pseudo_encrypt(4)),
(pseudo_encrypt(5),pseudo_encrypt(5)),
(pseudo_encrypt(5),pseudo_encrypt(1)),
(pseudo_encrypt(5),pseudo_encrypt(3)),
(pseudo_encrypt(5),pseudo_encrypt(4)),
(pseudo_encrypt(5),pseudo_encrypt(2)),
(pseudo_encrypt(6),pseudo_encrypt(2)),
(pseudo_encrypt(6),pseudo_encrypt(3)),
(pseudo_encrypt(6),pseudo_encrypt(1)),
(pseudo_encrypt(6),pseudo_encrypt(5)),
(pseudo_encrypt(6),pseudo_encrypt(4)),
(pseudo_encrypt(7),pseudo_encrypt(5)),
(pseudo_encrypt(7),pseudo_encrypt(3)),
(pseudo_encrypt(7),pseudo_encrypt(2)),
(pseudo_encrypt(7),pseudo_encrypt(1)),
(pseudo_encrypt(7),pseudo_encrypt(4)),
(pseudo_encrypt(8),pseudo_encrypt(4)),
(pseudo_encrypt(8),pseudo_encrypt(1)),
(pseudo_encrypt(8),pseudo_encrypt(5)),
(pseudo_encrypt(8),pseudo_encrypt(3)),
(pseudo_encrypt(8),pseudo_encrypt(2)),
(pseudo_encrypt(9),pseudo_encrypt(2)),
(pseudo_encrypt(9),pseudo_encrypt(4)),
(pseudo_encrypt(9),pseudo_encrypt(3)),
(pseudo_encrypt(9),pseudo_encrypt(5)),
(pseudo_encrypt(9),pseudo_encrypt(1)),
(pseudo_encrypt(10),pseudo_encrypt(4)),
(pseudo_encrypt(10),pseudo_encrypt(1)),
(pseudo_encrypt(10),pseudo_encrypt(5)),
(pseudo_encrypt(10),pseudo_encrypt(3)),
(pseudo_encrypt(10),pseudo_encrypt(2))