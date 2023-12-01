-- recommended: use entireDB.sql inside the pgadmin directory instead of this file, it has all schema and data
create table main_apartments
(
    apt_id serial primary key,
    building_name text not null,
    apt_number text not null,
    total_rooms integer
);

-- rooms depend on main_apartments
create table rooms
(
    room_id serial primary key,
    apt_id serial references main_apartments(apt_id),
    room_number text not null,
    room_type text,
    capacity integer,
    vacant boolean not null
);

-- tenants depend on rooms and main_apartments
create table tenants
(
    tenant_id text primary key,
    room_id serial references rooms(room_id),
    apt_id serial references main_apartments(apt_id),
    name text not null,
    emirates_id text not null,
    phone_number integer not null,
    email text,
    date_settle_in date not null
);

-- rent_payments depend on tenants
create table rent_payments
(
    payment_id text primary key,
    tenant_id text references tenants(tenant_id),
    month_year text not null,
    amount_paid integer not null,
    amount_due integer,
    notes text
);

-- contracts depend on tenants
create table contracts
(
    contract_id text primary key,
    tenant_id text references tenants(tenant_id),
    contract_start date not null,
    contract_end date not null,
    rent integer not null,
    active boolean not null,
    notes text
);

-- apartment_expenses depend on main_apartments
create table apartment_expenses
(
    expense_id serial primary key,
    apt_id serial references main_apartments(apt_id),
    month_year text not null,
    amount_paid integer not null,
    notes text
);

-- monthly_reports depend on main_apartments
create table monthly_reports
(
    report_id text primary key,
    apt_id serial references main_apartments(apt_id),
    month_year text not null,
    total_rent_due integer not null,
    total_rent_paid integer not null,
    total_expenses integer not null
);
