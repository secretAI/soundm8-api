--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5
-- Dumped by pg_dump version 14.2

-- Started on 2022-09-02 01:05:10 +07

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

ALTER TABLE IF EXISTS ONLY public.users DROP CONSTRAINT IF EXISTS "FK_e6dfce6d759dcd3e43a39c6374b";
ALTER TABLE IF EXISTS ONLY public.invite_codes DROP CONSTRAINT IF EXISTS "FK_e5ccfc7e7062b9538b56e6f6a92";
ALTER TABLE IF EXISTS ONLY public.orders DROP CONSTRAINT IF EXISTS "FK_151b79a83ba240b0cb31b2302d1";
DROP INDEX IF EXISTS public.user_telegram_id_index;
DROP INDEX IF EXISTS public.order_url_index;
ALTER TABLE IF EXISTS ONLY public.users DROP CONSTRAINT IF EXISTS "UQ_fe0bb3f6520ee0469504521e710";
ALTER TABLE IF EXISTS ONLY public.orders DROP CONSTRAINT IF EXISTS "UQ_bdd49fb3340b779d24afad0b735";
ALTER TABLE IF EXISTS ONLY public.invite_codes DROP CONSTRAINT IF EXISTS "UQ_9649315f0ab2fcbd1de4a2dda80";
ALTER TABLE IF EXISTS ONLY public.users DROP CONSTRAINT IF EXISTS "UQ_1a1e4649fd31ea6ec6b025c7bfc";
ALTER TABLE IF EXISTS ONLY public.users DROP CONSTRAINT IF EXISTS "REL_e6dfce6d759dcd3e43a39c6374";
ALTER TABLE IF EXISTS ONLY public.invite_codes DROP CONSTRAINT IF EXISTS "REL_e5ccfc7e7062b9538b56e6f6a9";
ALTER TABLE IF EXISTS ONLY public.users DROP CONSTRAINT IF EXISTS "PK_a3ffb1c0c8416b9fc6f907b7433";
ALTER TABLE IF EXISTS ONLY public.migrations DROP CONSTRAINT IF EXISTS "PK_8c82d7f526340ab734260ea46be";
ALTER TABLE IF EXISTS ONLY public.orders DROP CONSTRAINT IF EXISTS "PK_710e2d4957aa5878dfe94e4ac2f";
ALTER TABLE IF EXISTS ONLY public.invite_codes DROP CONSTRAINT IF EXISTS "PK_6c0ede25edb23ae63c935138e33";
ALTER TABLE IF EXISTS public.migrations ALTER COLUMN id DROP DEFAULT;
DROP TABLE IF EXISTS public.users;
DROP TABLE IF EXISTS public.orders;
DROP SEQUENCE IF EXISTS public.migrations_id_seq;
DROP TABLE IF EXISTS public.migrations;
DROP TABLE IF EXISTS public.invite_codes;
DROP TYPE IF EXISTS public.orders_key_enum;
--
-- TOC entry 838 (class 1247 OID 22284)
-- Name: orders_key_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.orders_key_enum AS ENUM (
    'Cb',
    'Gb',
    'Db',
    'Ab',
    'Eb',
    'Bb',
    'F',
    'C',
    'G',
    'D',
    'A',
    'E',
    'B',
    'F#',
    'C#',
    'G#',
    'D#',
    'A#'
);


ALTER TYPE public.orders_key_enum OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 213 (class 1259 OID 30588)
-- Name: invite_codes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.invite_codes (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    body character varying(18) NOT NULL,
    created_at timestamp without time zone DEFAULT (now())::timestamp without time zone NOT NULL,
    is_used boolean DEFAULT false NOT NULL,
    user_id uuid
);


ALTER TABLE public.invite_codes OWNER TO postgres;

--
-- TOC entry 210 (class 1259 OID 30470)
-- Name: migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.migrations (
    id integer NOT NULL,
    "timestamp" bigint NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE public.migrations OWNER TO postgres;

--
-- TOC entry 209 (class 1259 OID 30469)
-- Name: migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.migrations_id_seq OWNER TO postgres;

--
-- TOC entry 3626 (class 0 OID 0)
-- Dependencies: 209
-- Name: migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.migrations_id_seq OWNED BY public.migrations.id;


--
-- TOC entry 211 (class 1259 OID 30557)
-- Name: orders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.orders (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    url text NOT NULL,
    key public.orders_key_enum NOT NULL,
    bpm integer DEFAULT 0 NOT NULL,
    created_at timestamp without time zone DEFAULT (now())::timestamp without time zone NOT NULL,
    is_completed boolean DEFAULT false NOT NULL,
    "userId" uuid
);


ALTER TABLE public.orders OWNER TO postgres;

--
-- TOC entry 212 (class 1259 OID 30571)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    username character varying NOT NULL,
    telegram_id bigint,
    created_at timestamp without time zone DEFAULT (now())::timestamp without time zone NOT NULL,
    is_activated boolean DEFAULT false NOT NULL,
    invite_code_id uuid
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 3446 (class 2604 OID 30473)
-- Name: migrations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.migrations ALTER COLUMN id SET DEFAULT nextval('public.migrations_id_seq'::regclass);


--
-- TOC entry 3474 (class 2606 OID 30595)
-- Name: invite_codes PK_6c0ede25edb23ae63c935138e33; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.invite_codes
    ADD CONSTRAINT "PK_6c0ede25edb23ae63c935138e33" PRIMARY KEY (id);


--
-- TOC entry 3460 (class 2606 OID 30567)
-- Name: orders PK_710e2d4957aa5878dfe94e4ac2f; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY (id);


--
-- TOC entry 3458 (class 2606 OID 30477)
-- Name: migrations PK_8c82d7f526340ab734260ea46be; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.migrations
    ADD CONSTRAINT "PK_8c82d7f526340ab734260ea46be" PRIMARY KEY (id);


--
-- TOC entry 3465 (class 2606 OID 30580)
-- Name: users PK_a3ffb1c0c8416b9fc6f907b7433; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY (id);


--
-- TOC entry 3476 (class 2606 OID 30599)
-- Name: invite_codes REL_e5ccfc7e7062b9538b56e6f6a9; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.invite_codes
    ADD CONSTRAINT "REL_e5ccfc7e7062b9538b56e6f6a9" UNIQUE (user_id);


--
-- TOC entry 3467 (class 2606 OID 30586)
-- Name: users REL_e6dfce6d759dcd3e43a39c6374; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "REL_e6dfce6d759dcd3e43a39c6374" UNIQUE (invite_code_id);


--
-- TOC entry 3469 (class 2606 OID 30584)
-- Name: users UQ_1a1e4649fd31ea6ec6b025c7bfc; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "UQ_1a1e4649fd31ea6ec6b025c7bfc" UNIQUE (telegram_id);


--
-- TOC entry 3478 (class 2606 OID 30597)
-- Name: invite_codes UQ_9649315f0ab2fcbd1de4a2dda80; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.invite_codes
    ADD CONSTRAINT "UQ_9649315f0ab2fcbd1de4a2dda80" UNIQUE (body);


--
-- TOC entry 3462 (class 2606 OID 30569)
-- Name: orders UQ_bdd49fb3340b779d24afad0b735; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT "UQ_bdd49fb3340b779d24afad0b735" UNIQUE (url);


--
-- TOC entry 3471 (class 2606 OID 30582)
-- Name: users UQ_fe0bb3f6520ee0469504521e710; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE (username);


--
-- TOC entry 3463 (class 1259 OID 30570)
-- Name: order_url_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX order_url_index ON public.orders USING btree (url);


--
-- TOC entry 3472 (class 1259 OID 30587)
-- Name: user_telegram_id_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX user_telegram_id_index ON public.users USING btree (telegram_id);


--
-- TOC entry 3479 (class 2606 OID 32204)
-- Name: orders FK_151b79a83ba240b0cb31b2302d1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT "FK_151b79a83ba240b0cb31b2302d1" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3481 (class 2606 OID 32199)
-- Name: invite_codes FK_e5ccfc7e7062b9538b56e6f6a92; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.invite_codes
    ADD CONSTRAINT "FK_e5ccfc7e7062b9538b56e6f6a92" FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3480 (class 2606 OID 32209)
-- Name: users FK_e6dfce6d759dcd3e43a39c6374b; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "FK_e6dfce6d759dcd3e43a39c6374b" FOREIGN KEY (invite_code_id) REFERENCES public.invite_codes(id) ON UPDATE CASCADE ON DELETE CASCADE;


-- Completed on 2022-09-02 01:05:10 +07

--
-- PostgreSQL database dump complete
--

