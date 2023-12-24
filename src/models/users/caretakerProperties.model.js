const { user } = require("../../../config/db.config");
const db = require("../index");

exports.getAllCaretakers = async () => {
  const query = "SELECT * FROM caretaker_properties";
  return await db.query(query);
}; // end of getAllCaretakers

exports.getCaretakerInstance = async (caretaker_id) => {
  const query = "SELECT * FROM caretaker_properties WHERE caretaker_id = $1";
  return await db.query(query, [caretaker_id]);
}; // end of getCaretakerInstance

exports.joinCaretakerProperties = async () => {
  const query =
    "select users.id, users.name, users.email, caretaker_properties.property_ids" +
    " from users" +
    " inner join caretaker_properties on users.id=caretaker_properties.caretaker_id";

  return await db.query(query);
}; // end of joinCaretakerProperties

exports.getJoinedCaretakerPropertiesInstance = async (caretaker_id) => {
  const query =
    "select users.id, users.name, users.email, caretaker_properties.property_ids" +
    " from users" +
    " inner join caretaker_properties on users.id=caretaker_properties.caretaker_id" +
    " where users.id = $1";
  return await db.query(query, [caretaker_id]);
};

exports.createCaretakerInstance = async (caretaker) => {
  // insert into users table (name, email, role)
  const values = [
    caretaker.name,
    caretaker.email,
    "caretaker", // role is always "caretaker
    "123", // temporary password for now
  ];
  const query =
    "INSERT INTO users (name, email, role, password_hashed) VALUES ($1, $2, $3, $4)";
  const userResult = await db.query(query, values);

  // get the id from the newly created record
  const query2 = "SELECT id FROM users WHERE email = $1";
  const values2 = [caretaker.email];
  const idResult = await db.query(query2, values2);
  const id = idResult.rows[0].id;

  // insert into caretaker_properties table (caretaker_id)
  const query3 =
    "INSERT INTO caretaker_properties (caretaker_id, property_ids) VALUES ($1, $2)";
  const values3 = [id, caretaker.property_ids];
  return await db.query(query3, values3);
}; // end of createCaretakerInstance

exports.updateCaretakerInstance = async (caretaker, caretaker_id) => {
  const query =
    "UPDATE caretaker_properties SET property_ids = $1 WHERE caretaker_id = $2";
  const values1 = [caretaker.property_ids, caretaker_id];
  await db.query(query, values1);

  const query2 =
    "UPDATE users SET name = $1, email = $2 WHERE id = $3";
  const values2 = [
    caretaker.name,
    caretaker.email,
    caretaker_id,
  ];
  return await db.query(query2, values2);
}; // end of updateCaretakerInstance
