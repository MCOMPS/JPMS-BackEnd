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
    "INSERT INTO tenants(ic_no, date_settle_in, customer_id) VALUES ($1, $2, $3)";

  return await db.query(query2, values2);
}; // end of makeNewTenant
