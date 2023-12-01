--
-- PostgreSQL database dump
--

-- Dumped from database version 15.2
-- Dumped by pg_dump version 15.1

-- Started on 2023-07-17 00:57:39

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
-- TOC entry 224 (class 1259 OID 24741)
-- Name: apartment_expenses; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.apartment_expenses (
    expense_id integer NOT NULL,
    apt_id integer NOT NULL,
    month_year text NOT NULL,
    amount_paid integer NOT NULL,
    notes text
);


ALTER TABLE public.apartment_expenses OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 24740)
-- Name: apartment_expenses_apt_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.apartment_expenses_apt_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.apartment_expenses_apt_id_seq OWNER TO postgres;

--
-- TOC entry 3392 (class 0 OID 0)
-- Dependencies: 223
-- Name: apartment_expenses_apt_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.apartment_expenses_apt_id_seq OWNED BY public.apartment_expenses.apt_id;


--
-- TOC entry 222 (class 1259 OID 24739)
-- Name: apartment_expenses_expense_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.apartment_expenses_expense_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.apartment_expenses_expense_id_seq OWNER TO postgres;

--
-- TOC entry 3393 (class 0 OID 0)
-- Dependencies: 222
-- Name: apartment_expenses_expense_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.apartment_expenses_expense_id_seq OWNED BY public.apartment_expenses.expense_id;


--
-- TOC entry 227 (class 1259 OID 24775)
-- Name: contracts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.contracts (
    contract_id text NOT NULL,
    tenant_id text,
    contract_start date NOT NULL,
    contract_end date NOT NULL,
    rent integer NOT NULL,
    notes text,
    active boolean NOT NULL
);


ALTER TABLE public.contracts OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 24675)
-- Name: main_apartments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.main_apartments (
    apt_id integer NOT NULL,
    building_name text NOT NULL,
    apt_number text NOT NULL,
    total_rooms integer
);


ALTER TABLE public.main_apartments OWNER TO postgres;

--
-- TOC entry 214 (class 1259 OID 24674)
-- Name: main_apartments_apt_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.main_apartments_apt_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.main_apartments_apt_id_seq OWNER TO postgres;

--
-- TOC entry 3394 (class 0 OID 0)
-- Dependencies: 214
-- Name: main_apartments_apt_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.main_apartments_apt_id_seq OWNED BY public.main_apartments.apt_id;


--
-- TOC entry 226 (class 1259 OID 24756)
-- Name: monthly_reports; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.monthly_reports (
    report_id text NOT NULL,
    apt_id integer NOT NULL,
    month_year text NOT NULL,
    total_rent_due integer NOT NULL,
    total_rent_paid integer NOT NULL,
    total_expenses integer NOT NULL
);


ALTER TABLE public.monthly_reports OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 24755)
-- Name: monthly_reports_apt_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.monthly_reports_apt_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.monthly_reports_apt_id_seq OWNER TO postgres;

--
-- TOC entry 3395 (class 0 OID 0)
-- Dependencies: 225
-- Name: monthly_reports_apt_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.monthly_reports_apt_id_seq OWNED BY public.monthly_reports.apt_id;


--
-- TOC entry 221 (class 1259 OID 24727)
-- Name: rent_payments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.rent_payments (
    payment_id text NOT NULL,
    tenant_id text,
    month_year text NOT NULL,
    amount_paid integer NOT NULL,
    amount_due integer,
    notes text
);


ALTER TABLE public.rent_payments OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 24685)
-- Name: rooms; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.rooms (
    room_id integer NOT NULL,
    apt_id integer NOT NULL,
    room_number text NOT NULL,
    room_type text,
    capacity integer,
    vacant boolean
);


ALTER TABLE public.rooms OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 24684)
-- Name: rooms_apt_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.rooms_apt_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.rooms_apt_id_seq OWNER TO postgres;

--
-- TOC entry 3396 (class 0 OID 0)
-- Dependencies: 217
-- Name: rooms_apt_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.rooms_apt_id_seq OWNED BY public.rooms.apt_id;


--
-- TOC entry 216 (class 1259 OID 24683)
-- Name: rooms_room_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.rooms_room_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.rooms_room_id_seq OWNER TO postgres;

--
-- TOC entry 3397 (class 0 OID 0)
-- Dependencies: 216
-- Name: rooms_room_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.rooms_room_id_seq OWNED BY public.rooms.room_id;


--
-- TOC entry 220 (class 1259 OID 24714)
-- Name: tenants; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tenants (
    tenant_id text NOT NULL,
    room_id integer NOT NULL,
    name text NOT NULL,
    emirates_id text NOT NULL,
    phone_number integer NOT NULL,
    email text,
    date_settle_in date NOT NULL,
    apt_id integer
);


ALTER TABLE public.tenants OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 24713)
-- Name: tenants_room_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tenants_room_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tenants_room_id_seq OWNER TO postgres;

--
-- TOC entry 3398 (class 0 OID 0)
-- Dependencies: 219
-- Name: tenants_room_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tenants_room_id_seq OWNED BY public.tenants.room_id;


--
-- TOC entry 3207 (class 2604 OID 24744)
-- Name: apartment_expenses expense_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.apartment_expenses ALTER COLUMN expense_id SET DEFAULT nextval('public.apartment_expenses_expense_id_seq'::regclass);


--
-- TOC entry 3208 (class 2604 OID 24745)
-- Name: apartment_expenses apt_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.apartment_expenses ALTER COLUMN apt_id SET DEFAULT nextval('public.apartment_expenses_apt_id_seq'::regclass);


--
-- TOC entry 3203 (class 2604 OID 24678)
-- Name: main_apartments apt_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.main_apartments ALTER COLUMN apt_id SET DEFAULT nextval('public.main_apartments_apt_id_seq'::regclass);


--
-- TOC entry 3209 (class 2604 OID 24759)
-- Name: monthly_reports apt_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.monthly_reports ALTER COLUMN apt_id SET DEFAULT nextval('public.monthly_reports_apt_id_seq'::regclass);


--
-- TOC entry 3204 (class 2604 OID 24688)
-- Name: rooms room_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rooms ALTER COLUMN room_id SET DEFAULT nextval('public.rooms_room_id_seq'::regclass);


--
-- TOC entry 3205 (class 2604 OID 24689)
-- Name: rooms apt_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rooms ALTER COLUMN apt_id SET DEFAULT nextval('public.rooms_apt_id_seq'::regclass);


--
-- TOC entry 3206 (class 2604 OID 24717)
-- Name: tenants room_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tenants ALTER COLUMN room_id SET DEFAULT nextval('public.tenants_room_id_seq'::regclass);


--
-- TOC entry 3383 (class 0 OID 24741)
-- Dependencies: 224
-- Data for Name: apartment_expenses; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.apartment_expenses VALUES (1, 1, '02_2023', 220, 'صيانة المطبخ');
INSERT INTO public.apartment_expenses VALUES (2, 1, '03_2023', 350, 'تلفزيون جديد');
INSERT INTO public.apartment_expenses VALUES (3, 2, '02_2023', 400, 'ثلاجة جديدة');
INSERT INTO public.apartment_expenses VALUES (4, 2, '03_2023', 110, 'خزانة جديدة');


--
-- TOC entry 3386 (class 0 OID 24775)
-- Dependencies: 227
-- Data for Name: contracts; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.contracts VALUES ('dff2e353-20e5-42ab-a914-c9e5ac4639b0', 'fcfe2040-1619-4da4-8b91-958b28014da4', '2023-02-15', '2023-03-15', 1600, NULL, false);
INSERT INTO public.contracts VALUES ('ab80b57e-0bd8-4daa-be69-585a1aec50e3', 'ad5608ee-841d-4c20-9e9a-da2ed56b8279', '2023-02-01', '2023-03-01', 1800, NULL, false);
INSERT INTO public.contracts VALUES ('b6f53fb0-ea98-4485-b72e-768e53e3adba', 'bf689d8c-7b9a-4531-b639-95dce90d4a7f', '2023-03-04', '2023-04-04', 1500, NULL, true);
INSERT INTO public.contracts VALUES ('c0344f8d-441a-4497-bf3c-7f9059181b43', 'ad5608ee-841d-4c20-9e9a-da2ed56b8279', '2023-03-01', '2023-04-01', 1800, NULL, true);
INSERT INTO public.contracts VALUES ('2c9afac7-317c-40af-9e77-cd1cfc1f3e18', 'fcfe2040-1619-4da4-8b91-958b28014da4', '2023-03-15', '2023-04-15', 1600, NULL, true);


--
-- TOC entry 3374 (class 0 OID 24675)
-- Dependencies: 215
-- Data for Name: main_apartments; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.main_apartments VALUES (1, 'الاتحاد', '602', 5);
INSERT INTO public.main_apartments VALUES (2, 'الاندلس', '805', 4);


--
-- TOC entry 3385 (class 0 OID 24756)
-- Dependencies: 226
-- Data for Name: monthly_reports; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3380 (class 0 OID 24727)
-- Dependencies: 221
-- Data for Name: rent_payments; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.rent_payments VALUES ('ba226029-ab20-4e9b-8804-8d60f028f08e', 'fcfe2040-1619-4da4-8b91-958b28014da4', '03_2023', 1000, 100, 'باقي عليه 100 درهم فقط ');
INSERT INTO public.rent_payments VALUES ('57442b4d-79ea-477c-97af-9e958d2c9209', 'fcfe2040-1619-4da4-8b91-958b28014da4', '02_2023', 1100, 0, 'تم استلام كامل المبلغ ');
INSERT INTO public.rent_payments VALUES ('27cb49ff-0bbe-4195-9dad-bad5eba3c769', 'ad5608ee-841d-4c20-9e9a-da2ed56b8279', '02_2023', 1200, 200, 'باقي عليه 200 درهم فقط');
INSERT INTO public.rent_payments VALUES ('22972c94-b7b8-4ecc-b4b5-56406b2916d5', 'ad5608ee-841d-4c20-9e9a-da2ed56b8279', '03_2023', 1600, 0, 'تم استلام كامل المبلغ واستلام المتبقى عليه من الشهر السابق');
INSERT INTO public.rent_payments VALUES ('3e703e75-7eb0-469d-99e5-3c605014eb41', 'bf689d8c-7b9a-4531-b639-95dce90d4a7f', '03_2023', 2000, 0, 'تم استلام كامل المبلغ ');


--
-- TOC entry 3377 (class 0 OID 24685)
-- Dependencies: 218
-- Data for Name: rooms; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.rooms VALUES (7, 2, 'B3', 'عادي', 2, true);
INSERT INTO public.rooms VALUES (6, 2, 'B2', 'عادي', 1, false);
INSERT INTO public.rooms VALUES (5, 2, 'B1', 'استوديو', 2, true);
INSERT INTO public.rooms VALUES (2, 1, 'A2', 'عادي', 1, false);
INSERT INTO public.rooms VALUES (4, 1, 'A4', 'ماستر', 1, true);
INSERT INTO public.rooms VALUES (8, 2, 'B4', 'ماستر', 2, true);
INSERT INTO public.rooms VALUES (3, 1, 'A3', 'ماستر', 3, true);
INSERT INTO public.rooms VALUES (1, 1, 'A1', 'عادي', 2, true);
INSERT INTO public.rooms VALUES (9, 1, 'A5', 'استوديو', 3, true);


--
-- TOC entry 3379 (class 0 OID 24714)
-- Dependencies: 220
-- Data for Name: tenants; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.tenants VALUES ('ad5608ee-841d-4c20-9e9a-da2ed56b8279', 6, 'عبدالكريم عبدالله', '784-1992-1234567', 501234567, 'kareemAbdullah@gmail.com', '2023-02-01', 2);
INSERT INTO public.tenants VALUES ('bf689d8c-7b9a-4531-b639-95dce90d4a7f', 5, 'احمد كريم', '784-1991-1234567', 501234567, 'ahmedKarim@gmail.com', '2023-03-04', 2);
INSERT INTO public.tenants VALUES ('fcfe2040-1619-4da4-8b91-958b28014da4', 2, 'عبدالقادر احمد', '784-1995-1234567', 501234567, 'kaderAhmed@gmail.com', '2023-02-15', 1);


--
-- TOC entry 3399 (class 0 OID 0)
-- Dependencies: 223
-- Name: apartment_expenses_apt_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.apartment_expenses_apt_id_seq', 1, false);


--
-- TOC entry 3400 (class 0 OID 0)
-- Dependencies: 222
-- Name: apartment_expenses_expense_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.apartment_expenses_expense_id_seq', 4, true);


--
-- TOC entry 3401 (class 0 OID 0)
-- Dependencies: 214
-- Name: main_apartments_apt_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.main_apartments_apt_id_seq', 2, true);


--
-- TOC entry 3402 (class 0 OID 0)
-- Dependencies: 225
-- Name: monthly_reports_apt_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.monthly_reports_apt_id_seq', 1, false);


--
-- TOC entry 3403 (class 0 OID 0)
-- Dependencies: 217
-- Name: rooms_apt_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.rooms_apt_id_seq', 1, false);


--
-- TOC entry 3404 (class 0 OID 0)
-- Dependencies: 216
-- Name: rooms_room_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.rooms_room_id_seq', 9, true);


--
-- TOC entry 3405 (class 0 OID 0)
-- Dependencies: 219
-- Name: tenants_room_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tenants_room_id_seq', 1, true);


--
-- TOC entry 3219 (class 2606 OID 24749)
-- Name: apartment_expenses apartment_expenses_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.apartment_expenses
    ADD CONSTRAINT apartment_expenses_pkey PRIMARY KEY (expense_id);


--
-- TOC entry 3223 (class 2606 OID 24781)
-- Name: contracts contracts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contracts
    ADD CONSTRAINT contracts_pkey PRIMARY KEY (contract_id);


--
-- TOC entry 3211 (class 2606 OID 24682)
-- Name: main_apartments main_apartments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.main_apartments
    ADD CONSTRAINT main_apartments_pkey PRIMARY KEY (apt_id);


--
-- TOC entry 3221 (class 2606 OID 24763)
-- Name: monthly_reports monthly_reports_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.monthly_reports
    ADD CONSTRAINT monthly_reports_pkey PRIMARY KEY (report_id);


--
-- TOC entry 3217 (class 2606 OID 24733)
-- Name: rent_payments rent_payments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rent_payments
    ADD CONSTRAINT rent_payments_pkey PRIMARY KEY (payment_id);


--
-- TOC entry 3213 (class 2606 OID 24693)
-- Name: rooms rooms_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rooms
    ADD CONSTRAINT rooms_pkey PRIMARY KEY (room_id);


--
-- TOC entry 3215 (class 2606 OID 24721)
-- Name: tenants tenants_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tenants
    ADD CONSTRAINT tenants_pkey PRIMARY KEY (tenant_id);


--
-- TOC entry 3228 (class 2606 OID 24750)
-- Name: apartment_expenses apartment_expenses_apt_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.apartment_expenses
    ADD CONSTRAINT apartment_expenses_apt_id_fkey FOREIGN KEY (apt_id) REFERENCES public.main_apartments(apt_id);


--
-- TOC entry 3230 (class 2606 OID 24782)
-- Name: contracts contracts_tenant_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contracts
    ADD CONSTRAINT contracts_tenant_id_fkey FOREIGN KEY (tenant_id) REFERENCES public.tenants(tenant_id);


--
-- TOC entry 3229 (class 2606 OID 24764)
-- Name: monthly_reports monthly_reports_apt_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.monthly_reports
    ADD CONSTRAINT monthly_reports_apt_id_fkey FOREIGN KEY (apt_id) REFERENCES public.main_apartments(apt_id);


--
-- TOC entry 3227 (class 2606 OID 24734)
-- Name: rent_payments rent_payments_tenant_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rent_payments
    ADD CONSTRAINT rent_payments_tenant_id_fkey FOREIGN KEY (tenant_id) REFERENCES public.tenants(tenant_id);


--
-- TOC entry 3224 (class 2606 OID 24694)
-- Name: rooms rooms_apt_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rooms
    ADD CONSTRAINT rooms_apt_id_fkey FOREIGN KEY (apt_id) REFERENCES public.main_apartments(apt_id);


--
-- TOC entry 3225 (class 2606 OID 24800)
-- Name: tenants tenants_apt_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tenants
    ADD CONSTRAINT tenants_apt_id_fkey FOREIGN KEY (apt_id) REFERENCES public.main_apartments(apt_id);


--
-- TOC entry 3226 (class 2606 OID 24722)
-- Name: tenants tenants_room_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tenants
    ADD CONSTRAINT tenants_room_id_fkey FOREIGN KEY (room_id) REFERENCES public.rooms(room_id);


-- Completed on 2023-07-17 00:57:39

--
-- PostgreSQL database dump complete
--

