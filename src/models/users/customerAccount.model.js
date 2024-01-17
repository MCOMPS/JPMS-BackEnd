const db = require("../index");

exports.getAllCustomers = async () => {
  const query = "SELECT * FROM customers";

  return await db.query(query);
}; // end of getAllCustomers

exports.makeNewCustomer = async (user) => {
  // check user exists
  const query1 = "SELECT * FROM customers WHERE auth0_id=$1";
  const values1 = [user.auth0_id];

  const exists = await db.query(query1, values1);
  if (exists.rows.length > 0) {
    console.log("user already exists");
    return "User already exists";
  }

  // else add the new customer
  const query2 = "INSERT INTO customers(auth0_id) values ($1) RETURNING id";
  const values2 = [user.auth0_id];

  const result = await db.query(query2, values2);
  const customer_id = result.rows[0].id;

  const query3 =
    "INSERT INTO tenants(customer_id, name, email, picture)" +
    "VALUES ($1, $2, $3, $4)";
  const values3 = [customer_id, user.name, user.email, user.picture];

  return await db.query(query3, values3);
};
