--
-- PostgreSQL database dump
--

-- Dumped from database version 15.4 (Ubuntu 15.4-1ubuntu1)
-- Dumped by pg_dump version 16.0

-- Started on 2023-12-01 12:57:56

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
-- TOC entry 214 (class 1259 OID 16390)
-- Name: apartment_expenses; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.apartment_expenses (
    expense_id integer NOT NULL,
    property_id integer NOT NULL,
    month_year text NOT NULL,
    amount_paid integer NOT NULL,
    notes text
);


--
-- TOC entry 215 (class 1259 OID 16395)
-- Name: apartment_expenses_apt_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.apartment_expenses_apt_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3418 (class 0 OID 0)
-- Dependencies: 215
-- Name: apartment_expenses_apt_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.apartment_expenses_apt_id_seq OWNED BY public.apartment_expenses.property_id;


--
-- TOC entry 216 (class 1259 OID 16396)
-- Name: apartment_expenses_expense_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.apartment_expenses_expense_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3419 (class 0 OID 0)
-- Dependencies: 216
-- Name: apartment_expenses_expense_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.apartment_expenses_expense_id_seq OWNED BY public.apartment_expenses.expense_id;


--
-- TOC entry 217 (class 1259 OID 16397)
-- Name: contracts; Type: TABLE; Schema: public; Owner: -
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


--
-- TOC entry 218 (class 1259 OID 16402)
-- Name: invoices; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.invoices (
    invoice_id text NOT NULL,
    tenant_id text NOT NULL,
    invoice_date date NOT NULL,
    amount numeric(10,2) NOT NULL,
    amount_paid numeric(10,2) NOT NULL,
    notes text
);


--
-- TOC entry 219 (class 1259 OID 16407)
-- Name: properties; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.properties (
    property_id integer NOT NULL,
    building_name text NOT NULL,
    property_number text NOT NULL,
    total_rooms integer,
    property_type text
);


--
-- TOC entry 220 (class 1259 OID 16412)
-- Name: main_apartments_apt_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.main_apartments_apt_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3420 (class 0 OID 0)
-- Dependencies: 220
-- Name: main_apartments_apt_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.main_apartments_apt_id_seq OWNED BY public.properties.property_id;


--
-- TOC entry 221 (class 1259 OID 16413)
-- Name: monthly_reports; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.monthly_reports (
    report_id text NOT NULL,
    property_id integer NOT NULL,
    month_year text NOT NULL,
    total_rent_due integer NOT NULL,
    total_rent_paid integer NOT NULL,
    total_expenses integer NOT NULL
);


--
-- TOC entry 222 (class 1259 OID 16418)
-- Name: monthly_reports_apt_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.monthly_reports_apt_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3421 (class 0 OID 0)
-- Dependencies: 222
-- Name: monthly_reports_apt_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.monthly_reports_apt_id_seq OWNED BY public.monthly_reports.property_id;


--
-- TOC entry 223 (class 1259 OID 16419)
-- Name: rooms; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.rooms (
    room_id integer NOT NULL,
    property_id integer NOT NULL,
    room_number text NOT NULL,
    room_type text,
    capacity integer,
    vacant boolean
);


--
-- TOC entry 224 (class 1259 OID 16424)
-- Name: rooms_apt_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.rooms_apt_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3422 (class 0 OID 0)
-- Dependencies: 224
-- Name: rooms_apt_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.rooms_apt_id_seq OWNED BY public.rooms.property_id;


--
-- TOC entry 225 (class 1259 OID 16425)
-- Name: rooms_room_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.rooms_room_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3423 (class 0 OID 0)
-- Dependencies: 225
-- Name: rooms_room_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.rooms_room_id_seq OWNED BY public.rooms.room_id;


--
-- TOC entry 226 (class 1259 OID 16426)
-- Name: tenants; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tenants (
    tenant_id text NOT NULL,
    room_id integer NOT NULL,
    name text NOT NULL,
    emirates_id text NOT NULL,
    phone_number integer NOT NULL,
    email text,
    date_settle_in date NOT NULL,
    property_id integer
);


--
-- TOC entry 227 (class 1259 OID 16431)
-- Name: tenants_room_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.tenants_room_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3424 (class 0 OID 0)
-- Dependencies: 227
-- Name: tenants_room_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.tenants_room_id_seq OWNED BY public.tenants.room_id;


--
-- TOC entry 3229 (class 2604 OID 16432)
-- Name: apartment_expenses expense_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.apartment_expenses ALTER COLUMN expense_id SET DEFAULT nextval('public.apartment_expenses_expense_id_seq'::regclass);


--
-- TOC entry 3230 (class 2604 OID 16433)
-- Name: apartment_expenses property_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.apartment_expenses ALTER COLUMN property_id SET DEFAULT nextval('public.apartment_expenses_apt_id_seq'::regclass);


--
-- TOC entry 3232 (class 2604 OID 16435)
-- Name: monthly_reports property_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.monthly_reports ALTER COLUMN property_id SET DEFAULT nextval('public.monthly_reports_apt_id_seq'::regclass);


--
-- TOC entry 3231 (class 2604 OID 16434)
-- Name: properties property_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.properties ALTER COLUMN property_id SET DEFAULT nextval('public.main_apartments_apt_id_seq'::regclass);


--
-- TOC entry 3233 (class 2604 OID 16436)
-- Name: rooms room_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.rooms ALTER COLUMN room_id SET DEFAULT nextval('public.rooms_room_id_seq'::regclass);


--
-- TOC entry 3234 (class 2604 OID 16437)
-- Name: rooms property_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.rooms ALTER COLUMN property_id SET DEFAULT nextval('public.rooms_apt_id_seq'::regclass);


--
-- TOC entry 3235 (class 2604 OID 16438)
-- Name: tenants room_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tenants ALTER COLUMN room_id SET DEFAULT nextval('public.tenants_room_id_seq'::regclass);


--
-- TOC entry 3399 (class 0 OID 16390)
-- Dependencies: 214
-- Data for Name: apartment_expenses; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.apartment_expenses VALUES (1, 1, '02_2023', 220, 'صيانة المطبخ');
INSERT INTO public.apartment_expenses VALUES (2, 1, '03_2023', 350, 'تلفزيون جديد');
INSERT INTO public.apartment_expenses VALUES (3, 2, '02_2023', 400, 'ثلاجة جديدة');
INSERT INTO public.apartment_expenses VALUES (4, 2, '03_2023', 110, 'خزانة جديدة');


--
-- TOC entry 3402 (class 0 OID 16397)
-- Dependencies: 217
-- Data for Name: contracts; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.contracts VALUES ('dff2e353-20e5-42ab-a914-c9e5ac4639b0', 'fcfe2040-1619-4da4-8b91-958b28014da4', '2023-02-15', '2023-03-15', 1600, NULL, false);
INSERT INTO public.contracts VALUES ('ab80b57e-0bd8-4daa-be69-585a1aec50e3', 'ad5608ee-841d-4c20-9e9a-da2ed56b8279', '2023-02-01', '2023-03-01', 1800, NULL, false);
INSERT INTO public.contracts VALUES ('b6f53fb0-ea98-4485-b72e-768e53e3adba', 'bf689d8c-7b9a-4531-b639-95dce90d4a7f', '2023-03-04', '2023-04-04', 1500, NULL, true);
INSERT INTO public.contracts VALUES ('c0344f8d-441a-4497-bf3c-7f9059181b43', 'ad5608ee-841d-4c20-9e9a-da2ed56b8279', '2023-03-01', '2023-04-01', 1800, NULL, true);
INSERT INTO public.contracts VALUES ('2c9afac7-317c-40af-9e77-cd1cfc1f3e18', 'fcfe2040-1619-4da4-8b91-958b28014da4', '2023-03-15', '2023-04-15', 1600, NULL, true);


--
-- TOC entry 3403 (class 0 OID 16402)
-- Dependencies: 218
-- Data for Name: invoices; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.invoices VALUES ('invoice/8898', 'tenant/3003', '2023-07-28', 800.00, 550.00, 'test Invoice');


--
-- TOC entry 3406 (class 0 OID 16413)
-- Dependencies: 221
-- Data for Name: monthly_reports; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 3404 (class 0 OID 16407)
-- Dependencies: 219
-- Data for Name: properties; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.properties VALUES (1, 'الاتحاد', '602', 5, 'apartment');
INSERT INTO public.properties VALUES (2, 'الاندلس', '805', 4, 'apartment');
INSERT INTO public.properties VALUES (3, 'Sunny Heights', '101', 3, 'apartment');
INSERT INTO public.properties VALUES (4, 'Maple Gardens', '207', 5, 'apartment');
INSERT INTO public.properties VALUES (5, 'Ocean View Plaza', '412', 8, 'apartment');
INSERT INTO public.properties VALUES (6, 'Pine Ridge Residences', '550', 4, 'apartment');
INSERT INTO public.properties VALUES (7, 'Meadowside Manor', '625', 6, 'apartment');
INSERT INTO public.properties VALUES (8, 'Urban Oasis Towers', '804', 2, 'apartment');
INSERT INTO public.properties VALUES (9, 'Cityscape Apartments', '916', 7, 'apartment');
INSERT INTO public.properties VALUES (10, 'Harbor Lights Residency', '1030', 5, 'apartment');
INSERT INTO public.properties VALUES (11, 'Majestic View Estates', '1201', 4, 'apartment');
INSERT INTO public.properties VALUES (12, 'Tranquil Haven Homes', '1315', 9, 'apartment');
INSERT INTO public.properties VALUES (16, 'Testing remote db', '1315', 9, 'apartment');


--
-- TOC entry 3408 (class 0 OID 16419)
-- Dependencies: 223
-- Data for Name: rooms; Type: TABLE DATA; Schema: public; Owner: -
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
-- TOC entry 3411 (class 0 OID 16426)
-- Dependencies: 226
-- Data for Name: tenants; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.tenants VALUES ('ad5608ee-841d-4c20-9e9a-da2ed56b8279', 6, 'عبدالكريم عبدالله', '784-1992-1234567', 501234567, 'kareemAbdullah@gmail.com', '2023-02-01', 2);
INSERT INTO public.tenants VALUES ('bf689d8c-7b9a-4531-b639-95dce90d4a7f', 5, 'احمد كريم', '784-1991-1234567', 501234567, 'ahmedKarim@gmail.com', '2023-03-04', 2);
INSERT INTO public.tenants VALUES ('fcfe2040-1619-4da4-8b91-958b28014da4', 2, 'عبدالقادر احمد', '784-1995-1234567', 501234567, 'kaderAhmed@gmail.com', '2023-02-15', 1);
INSERT INTO public.tenants VALUES ('tenant/3003', 4, 'Test Tenant', '33334444444', 1234567, 'test@mail.com', '2023-07-18', 1);


--
-- TOC entry 3425 (class 0 OID 0)
-- Dependencies: 215
-- Name: apartment_expenses_apt_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.apartment_expenses_apt_id_seq', 1, false);


--
-- TOC entry 3426 (class 0 OID 0)
-- Dependencies: 216
-- Name: apartment_expenses_expense_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.apartment_expenses_expense_id_seq', 5, true);


--
-- TOC entry 3427 (class 0 OID 0)
-- Dependencies: 220
-- Name: main_apartments_apt_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.main_apartments_apt_id_seq', 16, true);


--
-- TOC entry 3428 (class 0 OID 0)
-- Dependencies: 222
-- Name: monthly_reports_apt_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.monthly_reports_apt_id_seq', 1, false);


--
-- TOC entry 3429 (class 0 OID 0)
-- Dependencies: 224
-- Name: rooms_apt_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.rooms_apt_id_seq', 1, false);


--
-- TOC entry 3430 (class 0 OID 0)
-- Dependencies: 225
-- Name: rooms_room_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.rooms_room_id_seq', 10, true);


--
-- TOC entry 3431 (class 0 OID 0)
-- Dependencies: 227
-- Name: tenants_room_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.tenants_room_id_seq', 1, true);


--
-- TOC entry 3237 (class 2606 OID 16440)
-- Name: apartment_expenses apartment_expenses_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.apartment_expenses
    ADD CONSTRAINT apartment_expenses_pkey PRIMARY KEY (expense_id);


--
-- TOC entry 3239 (class 2606 OID 16442)
-- Name: contracts contracts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.contracts
    ADD CONSTRAINT contracts_pkey PRIMARY KEY (contract_id);


--
-- TOC entry 3241 (class 2606 OID 16444)
-- Name: invoices invoices_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.invoices
    ADD CONSTRAINT invoices_pkey PRIMARY KEY (invoice_id);


--
-- TOC entry 3243 (class 2606 OID 16446)
-- Name: properties main_apartments_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.properties
    ADD CONSTRAINT main_apartments_pkey PRIMARY KEY (property_id);


--
-- TOC entry 3245 (class 2606 OID 16448)
-- Name: monthly_reports monthly_reports_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.monthly_reports
    ADD CONSTRAINT monthly_reports_pkey PRIMARY KEY (report_id);


--
-- TOC entry 3247 (class 2606 OID 16450)
-- Name: rooms rooms_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.rooms
    ADD CONSTRAINT rooms_pkey PRIMARY KEY (room_id);


--
-- TOC entry 3249 (class 2606 OID 16452)
-- Name: tenants tenants_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tenants
    ADD CONSTRAINT tenants_pkey PRIMARY KEY (tenant_id);


--
-- TOC entry 3250 (class 2606 OID 16453)
-- Name: apartment_expenses apartment_expenses_property_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.apartment_expenses
    ADD CONSTRAINT apartment_expenses_property_id_fkey FOREIGN KEY (property_id) REFERENCES public.properties(property_id);


--
-- TOC entry 3251 (class 2606 OID 16458)
-- Name: contracts contracts_tenant_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.contracts
    ADD CONSTRAINT contracts_tenant_id_fkey FOREIGN KEY (tenant_id) REFERENCES public.tenants(tenant_id);


--
-- TOC entry 3252 (class 2606 OID 16463)
-- Name: invoices invoices_tenant_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.invoices
    ADD CONSTRAINT invoices_tenant_id_fkey FOREIGN KEY (tenant_id) REFERENCES public.tenants(tenant_id);


--
-- TOC entry 3253 (class 2606 OID 16468)
-- Name: monthly_reports monthly_reports_property_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.monthly_reports
    ADD CONSTRAINT monthly_reports_property_id_fkey FOREIGN KEY (property_id) REFERENCES public.properties(property_id);


--
-- TOC entry 3254 (class 2606 OID 16473)
-- Name: rooms rooms_property_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.rooms
    ADD CONSTRAINT rooms_property_id_fkey FOREIGN KEY (property_id) REFERENCES public.properties(property_id);


--
-- TOC entry 3255 (class 2606 OID 16478)
-- Name: tenants tenants_property_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tenants
    ADD CONSTRAINT tenants_property_id_fkey FOREIGN KEY (property_id) REFERENCES public.properties(property_id);


--
-- TOC entry 3256 (class 2606 OID 16483)
-- Name: tenants tenants_room_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tenants
    ADD CONSTRAINT tenants_room_id_fkey FOREIGN KEY (room_id) REFERENCES public.rooms(room_id);


-- Completed on 2023-12-01 12:57:59

--
-- PostgreSQL database dump complete
--

