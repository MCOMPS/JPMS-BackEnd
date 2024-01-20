const db = require("../index");
// slow version (takes almost 6 seconds to load)
// exports.getMyContracts = async (auth0_id) => {
//   // Get customer_id
//   const query1 = "SELECT id FROM customers WHERE auth0_id=$1";
//   const values1 = [auth0_id];
//   const result1 = await db.query(query1, values1);
//   const customer_id = result1.rows[0].id;

//   // Get tenant_id
//   const query2 = "SELECT id FROM tenants WHERE customer_id=$1";
//   const values2 = [customer_id];
//   const result2 = await db.query(query2, values2);
//   const tenant_id = result2.rows[0].id;

//   // Get contracts by tenant_id
//   const query3 = "SELECT * FROM contracts WHERE tenant_id=$1";
//   const values3 = [tenant_id];
//   const result3 = await db.query(query3, values3);
//   const contracts = result3.rows;

//   // Map contracts to the desired format
//   const contractsData = await Promise.all(
//     contracts.map(async (contract) => {
//       const property_id = contract.property_id;

//       // Get property from property_id
//       const query4 = "SELECT * FROM properties WHERE id=$1";
//       const values4 = [property_id];
//       const result4 = await db.query(query4, values4);
//       const property = result4.rows[0];

//       return {
//         property_id: property.id,
//         property_name: property.name,
//         contract_start: contract.contract_start,
//         contract_end: contract.contract_end,
//         rent: contract.rent,
//       };
//     })
//   );

//   return contractsData;
// };

// optimized version:
exports.getMyContracts = async (auth0_id) => {
  // Get customer_id and tenant_id in one query
  const query1 = `
    SELECT customers.id as customer_id, tenants.id as tenant_id
    FROM customers
    JOIN tenants ON tenants.customer_id = customers.id
    WHERE customers.auth0_id = $1
  `;
  const values1 = [auth0_id];
  const result1 = await db.query(query1, values1);
  const { customer_id, tenant_id } = result1.rows[0];

  // Get contracts and properties in one query
  const query2 = `
    SELECT contracts.*, properties.id as property_id, properties.name as property_name
    FROM contracts
    JOIN properties ON properties.id = contracts.property_id
    WHERE contracts.tenant_id = $1
  `;
  const values2 = [tenant_id];
  const result2 = await db.query(query2, values2);

  // Map contracts to the desired format
  const contractsData = result2.rows.map((contract) => ({
    property_id: contract.property_id,
    property_name: contract.property_name,
    contract_start: contract.contract_start,
    contract_end: contract.contract_end,
    rent: contract.rent,
  }));

  return contractsData;
};

exports.makeContractAfterpayment = async (auth0_id, property_id) => {
  // get the customer_id from auth0_id
  const query1 = "SELECT id FROM customers WHERE auth0_id=$1";
  const values1 = [auth0_id];
  const result1 = await db.query(query1, values1);

  // get the tenant_id from customer_id
  const query2 = "SELECT id FROM tenants WHERE customer_id=$1";
  const values2 = [result1.rows[0].id];
  const result2 = await db.query(query2, values2);
  const tenant_id = result2.rows[0].id;

  // make contract
  const query3 =
    "INSERT INTO contracts \n" +
    "(contract_start, contract_end, rent, notes, active, property_id, tenant_id, stripe_product_id) \n" +
    "VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id";
  const values3 = [
    "2024-01-01",
    "2024-12-31",
    1000,
    "",
    true,
    property_id,
    tenant_id,
    "prod_PHkV7sSNSFaaOX",
  ];

  const result3 = await db.query(query3, values3);
  const contract_id = result3.rows[0].id;

  // make invoice
  const query4 =
    "INSERT INTO invoices \n" +
    "(invoice_date, amount, notes, tenant_id, contract_id, stripe_price_id) \n" +
    "VALUES ($1, $2, $3, $4, $5, $6)";

  const currentDate = new Date();

  const currentDayOfMonth = currentDate.getDate();
  const currentMonth = currentDate.getMonth(); // Be careful! January is 0, not 1
  const currentYear = currentDate.getFullYear();

  const dateString =
    currentYear + "-" + (currentMonth + 1) + "-" + currentDayOfMonth;

  const values4 = [
    dateString,
    1000,
    "",
    tenant_id,
    contract_id,
    "price_1OTB9oCp3Bh7LH9hS97ufTzr",
  ];
  const result4 = await db.query(query4, values4);

  return result4;
};
