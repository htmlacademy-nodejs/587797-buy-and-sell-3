DROP TABLE IF EXISTS public.offers_categories CASCADE;
DROP TABLE IF EXISTS public.offers_comments CASCADE;
DROP TABLE IF EXISTS public.categories CASCADE;
DROP TABLE IF EXISTS public.offers CASCADE;
DROP TABLE IF EXISTS public.users CASCADE;

CREATE TABLE public.users (
    user_id  bigint                 NOT NULL PRIMARY KEY,
    email    character varying(256) NOT NULL UNIQUE,
    password character varying(256) NOT NULL,
    name     character varying(256) NOT NULL,
    surname  character varying(256) NOT NULL,
    avatar   character varying(256) NOT NULL
);

CREATE TABLE public.categories (
    category_id bigint                 NOT NULL PRIMARY KEY,
    name        character varying(256) NOT NULL
);

CREATE TABLE public.offers (
    offer_id    bigint                              NOT NULL PRIMARY KEY,
    title       character varying(256)              NOT NULL,
    price       bigint                              NOT NULL,
    type        smallint                            NOT NULL,
    description text                                NOT NULL,
    picture     character varying(256)              NOT NULL,
    author_id   bigint                              NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    created     timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE public.offers_categories (
    offer_id    bigint NOT NULL REFERENCES offers(offer_id)        ON DELETE CASCADE,
    category_id bigint NOT NULL REFERENCES categories(category_id) ON DELETE CASCADE,
    PRIMARY KEY (offer_id, category_id)
);

CREATE TABLE public.offers_comments (
    comment_id bigint NOT NULL PRIMARY KEY,
    text       text   NOT NULL,
    offer_id   bigint NOT NULL REFERENCES offers(offer_id) ON DELETE CASCADE,
    author_id  bigint NOT NULL REFERENCES users(user_id) ON DELETE CASCADE
);

-- INSERT INTO users VALUES(1, 'email1@email.com', 'ad21d2a', 'name1', 'surname1', 'avatar1');
-- INSERT INTO categories VALUES (1, 'books'), (2, 'sport'), (3, 'cars');
-- INSERT INTO offers VALUES(1, 'title1', 500, 1, 'desc1', 'picture1', 1);
-- INSERT INTO offers_categories VALUES(1, 1);
