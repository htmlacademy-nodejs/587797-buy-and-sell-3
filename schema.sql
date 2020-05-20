--
-- PostgreSQL database dump
--

-- Dumped from database version 12.3
-- Dumped by pg_dump version 12.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE IF EXISTS buysell;
--
-- Name: buysell; Type: DATABASE; Schema: -; Owner: -
--

CREATE DATABASE buysell WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'C' LC_CTYPE = 'C';


\connect buysell

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: DATABASE buysell; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON DATABASE buysell IS 'database for buysell project';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: categories; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.categories (
    category_id bigint NOT NULL,
    name character varying(256) NOT NULL
);


--
-- Name: offers; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.offers (
    offer_id bigint NOT NULL,
    title character varying(256) NOT NULL,
    price bigint NOT NULL,
    type smallint NOT NULL,
    description text NOT NULL,
    created timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    picture character varying(256) NOT NULL,
    author_id bigint NOT NULL
);


--
-- Name: offers_categories; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.offers_categories (
    offer_id bigint NOT NULL,
    category_id bigint NOT NULL
);


--
-- Name: TABLE offers_categories; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE public.offers_categories IS 'many-to-many for offers and categories tables';


--
-- Name: offers_comments; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.offers_comments (
    comment_id bigint NOT NULL,
    text text NOT NULL,
    offer_id bigint NOT NULL,
    author_id bigint NOT NULL
);


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    user_id bigint NOT NULL,
    name character varying(256) NOT NULL,
    surname character varying(256) NOT NULL,
    password character varying(256) NOT NULL,
    avatar character varying(256) NOT NULL,
    email character varying(256) NOT NULL
);


--
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (category_id);


--
-- Name: offers_categories offers_categories_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.offers_categories
    ADD CONSTRAINT offers_categories_pkey PRIMARY KEY (offer_id, category_id);


--
-- Name: offers_comments offers_comments_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.offers_comments
    ADD CONSTRAINT offers_comments_pkey PRIMARY KEY (comment_id);


--
-- Name: offers offers_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.offers
    ADD CONSTRAINT offers_pkey PRIMARY KEY (offer_id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- PostgreSQL database dump complete
--

