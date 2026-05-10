--
-- PostgreSQL database dump
--

\restrict t6rlIUXHgnq88f4dJldRjRhFjg9ld6cmGLkTzxbNimKSY9icWHaKEd5UDWcUzlE

-- Dumped from database version 16.13 (Debian 16.13-1.pgdg13+1)
-- Dumped by pg_dump version 16.13 (Debian 16.13-1.pgdg13+1)

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: book; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.book (
    id integer NOT NULL,
    nm_title character varying NOT NULL,
    nm_author character varying NOT NULL,
    dt_published_year integer NOT NULL,
    nr_followup_count integer DEFAULT 0 NOT NULL,
    nr_followdown_count integer DEFAULT 0 NOT NULL,
    dt_criado timestamp without time zone DEFAULT now(),
    nm_user_cri character varying,
    id_onboarding_user integer
);


ALTER TABLE public.book OWNER TO admin;

--
-- Name: book_follow; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.book_follow (
    id integer NOT NULL,
    is_followup boolean DEFAULT false NOT NULL,
    is_followdown boolean DEFAULT false NOT NULL,
    dt_criado timestamp without time zone DEFAULT now() NOT NULL,
    id_onboarding_user integer,
    id_book integer
);


ALTER TABLE public.book_follow OWNER TO admin;

--
-- Name: book_follow_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.book_follow_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.book_follow_id_seq OWNER TO admin;

--
-- Name: book_follow_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.book_follow_id_seq OWNED BY public.book_follow.id;


--
-- Name: book_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.book_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.book_id_seq OWNER TO admin;

--
-- Name: book_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.book_id_seq OWNED BY public.book.id;


--
-- Name: onboarding; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.onboarding (
    id integer NOT NULL,
    nm_user character varying NOT NULL,
    nr_cpf character varying,
    ie_role character varying NOT NULL
);


ALTER TABLE public.onboarding OWNER TO admin;

--
-- Name: onboarding_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.onboarding_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.onboarding_id_seq OWNER TO admin;

--
-- Name: onboarding_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.onboarding_id_seq OWNED BY public.onboarding.id;


--
-- Name: onboarding_id_seq1; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.onboarding_id_seq1
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.onboarding_id_seq1 OWNER TO admin;

--
-- Name: onboarding_id_seq1; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.onboarding_id_seq1 OWNED BY public.onboarding.id;


--
-- Name: book id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.book ALTER COLUMN id SET DEFAULT nextval('public.book_id_seq'::regclass);


--
-- Name: book_follow id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.book_follow ALTER COLUMN id SET DEFAULT nextval('public.book_follow_id_seq'::regclass);


--
-- Name: onboarding id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.onboarding ALTER COLUMN id SET DEFAULT nextval('public.onboarding_id_seq'::regclass);


--
-- Data for Name: book; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.book (id, nm_title, nm_author, dt_published_year, nr_followup_count, nr_followdown_count, dt_criado, nm_user_cri, id_onboarding_user) FROM stdin;
18	Domain-Driven Design	Eric Evans	2003	3	0	2026-05-09 23:22:07.240813	Sergio do Peões	2
17	Head First Design Patterns	Eric Freeman, et al.	2004	1	2	2026-05-09 23:21:47.635652	Sergio do Peões	2
16	Design Patterns: Elements of Reusable Object-Oriented Software	Erich Gamma, et al.	1994	2	1	2026-05-09 23:21:17.314565	Sergio do Peões	2
15	Patterns of Enterprise Application Architecture	Martin Fowler	2002	1	2	2026-05-09 23:19:16.597593	Firmino Filho	2
14	The Clean Coder	Robert C. Martin	2011	1	2	2026-05-09 23:18:59.350524	Firmino Filho	2
13	Clean Architecture	Robert C. Martin	2017	1	2	2026-05-09 23:18:41.490504	Firmino Filho	2
12	Working Effectively with Legacy Code	Michael Feathers	2004	2	1	2026-05-09 23:18:19.067966	Firmino Filho	2
10	Code Complete	Steve McConnell	1993	1	2	2026-05-09 23:17:42.010693	Firmino Filho	2
8	Clean Code	Robert C. Martin	2008	3	0	2026-05-09 23:16:28.015785	Firmino Filho	2
9	The Pragmatic Programmer	Andrew Hunt, David Thomas	1999	3	0	2026-05-09 23:17:22.583313	Firmino Filho	2
7	The Mythical Man-Month	Fred Brooks	1975	1	2	2026-05-09 23:14:22.212428	Bruna Cardoso	1
6	Compilers: Principles, Techniques, and Tools	Alfred V. Aho, et al.	1986	3	0	2026-05-09 23:13:59.936729	Bruna Cardoso	1
5	Operating System Concepts	Abraham Silberschatz, et al.	1982	2	0	2026-05-09 23:13:37.120781	Bruna Cardoso	1
1	Structure and Interpretation of Computer Programs	Harold Abelson, Gerald Jay Sussman	1985	0	1	2026-05-09 23:11:26.789625	Bruna Cardoso	1
4	Computer Networking: A Top-Down Approach	James Kurose, Keith Ross	2000	2	1	2026-05-09 23:13:12.463357	Bruna Cardoso	1
3	Introduction to Algorithms	Thomas H. Cormen, et al.	2009	1	2	2026-05-09 23:12:44.039253	Bruna Cardoso	1
2	The Art of Computer Programming	Donald Knuth	1968	2	1	2026-05-09 23:12:21.478604	Bruna Cardoso	1
11	Refactoring	Martin Fowler	1999	2	0	2026-05-09 23:18:00.023399	Firmino Filho	2
\.


--
-- Data for Name: book_follow; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.book_follow (id, is_followup, is_followdown, dt_criado, id_onboarding_user, id_book) FROM stdin;
2	f	t	2026-05-09 23:22:32.996773	1	17
3	t	f	2026-05-09 23:22:34.096914	1	16
4	t	f	2026-05-09 23:22:34.654851	1	15
5	f	t	2026-05-09 23:22:36.113427	1	14
6	f	t	2026-05-09 23:22:36.514222	1	13
7	t	f	2026-05-09 23:22:37.171276	1	12
8	t	f	2026-05-09 23:22:37.858605	1	11
9	t	f	2026-05-09 23:22:38.927471	1	10
10	t	f	2026-05-09 23:22:39.546967	1	9
11	t	f	2026-05-09 23:22:39.920252	1	8
12	t	f	2026-05-09 23:22:41.031236	1	6
13	f	t	2026-05-09 23:22:42.191972	1	7
15	f	t	2026-05-09 23:22:43.800626	1	4
16	f	t	2026-05-09 23:22:45.292919	1	3
17	t	f	2026-05-09 23:22:45.869994	1	2
18	f	t	2026-05-09 23:22:46.371268	1	1
21	t	f	2026-05-09 23:23:38.533576	1	18
22	t	f	2026-05-09 23:24:22.088634	3	18
24	t	f	2026-05-09 23:24:24.527539	3	17
25	t	f	2026-05-09 23:24:25.486687	3	16
26	f	t	2026-05-09 23:24:26.666066	3	15
29	f	t	2026-05-09 23:24:29.55316	3	14
30	t	f	2026-05-09 23:24:31.519792	3	13
31	f	t	2026-05-09 23:24:32.408221	3	12
32	t	f	2026-05-09 23:24:33.045242	3	11
33	f	t	2026-05-09 23:24:34.174817	3	10
34	t	f	2026-05-09 23:24:35.002609	3	9
35	t	f	2026-05-09 23:24:36.006121	3	8
36	t	f	2026-05-09 23:24:36.823656	3	7
37	t	f	2026-05-09 23:24:37.582147	3	6
38	t	f	2026-05-09 23:24:38.996614	3	5
39	t	f	2026-05-09 23:24:39.960501	3	4
40	t	f	2026-05-09 23:24:41.168716	3	3
41	f	t	2026-05-09 23:24:42.125638	3	2
42	t	f	2026-05-09 23:24:58.843957	2	18
43	f	t	2026-05-09 23:24:59.492011	2	17
44	f	t	2026-05-09 23:25:00.651622	2	16
45	f	t	2026-05-09 23:25:01.21873	2	15
47	t	f	2026-05-09 23:25:03.444658	2	14
48	f	t	2026-05-09 23:25:04.665982	2	13
49	t	f	2026-05-09 23:25:05.466259	2	12
50	f	t	2026-05-09 23:25:08.058638	2	10
51	t	f	2026-05-09 23:25:19.410276	2	8
52	t	f	2026-05-09 23:25:20.984891	2	9
53	f	t	2026-05-09 23:25:21.921376	2	7
54	t	f	2026-05-09 23:25:22.448012	2	6
55	t	f	2026-05-09 23:25:23.798081	2	5
56	t	f	2026-05-09 23:25:24.460209	2	4
57	f	t	2026-05-09 23:25:25.882283	2	3
58	t	f	2026-05-09 23:25:27.009027	2	2
\.


--
-- Data for Name: onboarding; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.onboarding (id, nm_user, nr_cpf, ie_role) FROM stdin;
1	Bruna Cardoso	08768031335	visitor
3	Anitta Bang	12345678912	visitor
2	Sergio do Peões	98765432198	visitor
\.


--
-- Name: book_follow_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.book_follow_id_seq', 58, true);


--
-- Name: book_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.book_id_seq', 18, true);


--
-- Name: onboarding_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.onboarding_id_seq', 3, true);


--
-- Name: onboarding_id_seq1; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.onboarding_id_seq1', 1, false);


--
-- Name: book_follow PK_1301620455d5272d6e31c91e718; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.book_follow
    ADD CONSTRAINT "PK_1301620455d5272d6e31c91e718" PRIMARY KEY (id);


--
-- Name: book PK_a3afef72ec8f80e6e5c310b28a4; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.book
    ADD CONSTRAINT "PK_a3afef72ec8f80e6e5c310b28a4" PRIMARY KEY (id);


--
-- Name: onboarding PK_b8b6cfe63674aaee17874f033cf; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.onboarding
    ADD CONSTRAINT "PK_b8b6cfe63674aaee17874f033cf" PRIMARY KEY (id);


--
-- Name: book_follow UQ_a14d7d0494093daa3e5d9edac1d; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.book_follow
    ADD CONSTRAINT "UQ_a14d7d0494093daa3e5d9edac1d" UNIQUE (id_onboarding_user, id_book);


--
-- Name: book_follow FK_338aa8a335e09160d37483ef6d6; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.book_follow
    ADD CONSTRAINT "FK_338aa8a335e09160d37483ef6d6" FOREIGN KEY (id_onboarding_user) REFERENCES public.onboarding(id) ON DELETE CASCADE;


--
-- Name: book FK_36d4fe3af20bbd4a76e1fad5924; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.book
    ADD CONSTRAINT "FK_36d4fe3af20bbd4a76e1fad5924" FOREIGN KEY (id_onboarding_user) REFERENCES public.onboarding(id);


--
-- Name: book_follow FK_78f63305c7a8bf8efc9d107ccbc; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.book_follow
    ADD CONSTRAINT "FK_78f63305c7a8bf8efc9d107ccbc" FOREIGN KEY (id_book) REFERENCES public.book(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict t6rlIUXHgnq88f4dJldRjRhFjg9ld6cmGLkTzxbNimKSY9icWHaKEd5UDWcUzlE

