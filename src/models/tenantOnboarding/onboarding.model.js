const db = require("../index");

exports.makeNewTenant = async (tenant) => {
  const values1 = [
    tenant.email,
    tenant.phone_country_code,
    tenant.phone_number,
    tenant.fname,
    tenant.lname,
  ];

  const query1 =
    "INSERT INTO customers(" +
    "email, phone_country_code, phone_number, fname, lname)" +
    "VALUES ($1, $2, $3, $4, $5) RETURNING id";

  const result = await db.query(query1, values1);
  const customer_id = result.rows[0].id;

  const values2 = [tenant.ic_no, tenant.date_settle_in, customer_id];
  const query2 =
    "INSERT INTO tenants(ic_no, date_settle_in, customer_id) VALUES ($1, $2, $3) RETURNING id";

  return await db.query(query2, values2);
}; // end of makeNewTenant

exports.makePayment = async (payment, tenant_id) => {
  const values = [
    tenant_id,
    payment.amount,
    payment.payment_method,
    payment.payment_status,
    payment.notes,
  ];

  let query = "";
  let result = null;

  if (payment.payment_method === "stripe") {
    query =
      "INSERT INTO payments(tenant_id, amount, payment_method, payment_status, notes, transaction_id, stripe_payment_details)" +
      " VALUES ($1, $2, $3, $4, $5, $6, $7)";
    result = await db.query(query, [...values, payment.transaction_id, payment.stripe_payment_details]);
  } else {
    query =
      "INSERT INTO payments(tenant_id, amount, payment_method, payment_status, notes) VALUES ($1, $2, $3, $4, $5)";
    result = await db.query(query, values);
  }

  return result;
}; // end of makePayment

exports.makeInitialContract = async (contract, tenant_id) => {
  const values = [
    contract.contract_start,
    contract.contract_end,
    contract.rent,
    contract.notes,
    true,
    contract.property_id,
    tenant_id,
  ];

  if (contract.notes === null || contract.notes === undefined) values[3] = "";

  const query =
    "INSERT INTO contracts(contract_start, contract_end, rent, notes, active, property_id, tenant_id)" +
    " VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id";
  return await db.query(query, values);
}; // end of makeInitialContract

exports.generateInvoice = async (contract_id, tenant_id, invoice) => {
  const values = [
    invoice.invoice_date,
    invoice.amount,
    invoice.amount_paid,
    invoice.notes,
    tenant_id,
    contract_id,
  ];

  if (invoice.notes === null || invoice.notes === undefined) values[3] = "";

  const query =
    "INSERT INTO invoices(invoice_date, amount, amount_paid, notes, tenant_id, contract_id)" +
    " VALUES ($1, $2, $3, $4, $5, $6)";

  return await db.query(query, values);
}; // end of generateInvoice