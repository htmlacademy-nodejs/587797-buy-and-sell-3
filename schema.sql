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

DROP TABLE IF EXISTS public.offers_categories CASCADE;
DROP TABLE IF EXISTS public.offers_comments CASCADE;
DROP TABLE IF EXISTS public.categories CASCADE;
DROP TABLE IF EXISTS public.offers CASCADE;
DROP TABLE IF EXISTS public.users CASCADE;

DROP SEQUENCE IF EXISTS users_sequence;
DROP SEQUENCE IF EXISTS categories_sequence;
DROP SEQUENCE IF EXISTS offers_sequence;
DROP SEQUENCE IF EXISTS offers_comments_sequence;

CREATE SEQUENCE users_sequence;
CREATE SEQUENCE categories_sequence;
CREATE SEQUENCE offers_sequence;
CREATE SEQUENCE offers_comments_sequence;

DROP TYPE IF EXISTS offer_type;
CREATE TYPE offer_type AS ENUM ('buy', 'sell');

CREATE TABLE public.users (
    user_id    BIGINT       NOT NULL PRIMARY KEY DEFAULT pseudo_encrypt(nextval('users_sequence')::int),
    email      VARCHAR(256) NOT NULL,
    password   VARCHAR(256) NOT NULL,
    name       VARCHAR(256) NOT NULL,
    surname    VARCHAR(256) NOT NULL,
    avatar     VARCHAR(256) NOT NULL,
    created_at TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE UNIQUE INDEX users_email ON public.users(email);

CREATE TABLE public.categories (
    category_id BIGINT       NOT NULL PRIMARY KEY DEFAULT pseudo_encrypt(nextval('categories_sequence')::int),
    name        VARCHAR(256) NOT NULL,
    created_at  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE public.offers (
    offer_id    BIGINT       NOT NULL PRIMARY KEY DEFAULT pseudo_encrypt(nextval('offers_sequence')::int),
    title       VARCHAR(256) NOT NULL,
    price       BIGINT       NOT NULL,
    type        offer_type   NOT NULL,
    description TEXT         NOT NULL,
    picture     VARCHAR(256) NOT NULL,
    author_id   BIGINT       NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    created_at  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX offers_title ON public.offers(title);

CREATE TABLE public.offers_comments (
    comment_id BIGINT    NOT NULL PRIMARY KEY DEFAULT pseudo_encrypt(nextval('offers_comments_sequence')::int),
    text       TEXT      NOT NULL,
    offer_id   BIGINT    NOT NULL REFERENCES offers(offer_id) ON DELETE CASCADE,
    author_id  BIGINT    NOT NULL REFERENCES users(user_id)   ON DELETE CASCADE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE public.offers_categories (
    offer_id    BIGINT    NOT NULL REFERENCES offers(offer_id)        ON DELETE CASCADE,
    category_id BIGINT    NOT NULL REFERENCES categories(category_id) ON DELETE CASCADE,
    created_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (offer_id, category_id)
);
