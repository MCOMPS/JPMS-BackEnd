const { user } = require("../../../config/db.config");
const db = require("../index");

exports.getAllCaretakers = async () => {
    const query = "SELECT * FROM caretaker_properties";
    return await db.query(query);
} // end of getAllCaretakers

exports.getCaretakerInstance = async (caretaker_id) => {
    const query = "SELECT * FROM caretaker_properties WHERE caretaker_id = $1";
    return await db.query(query, [caretaker_id]);
} // end of getCaretakerInstance

exports.createCaretakerInstance = async (caretaker) => {
    // insert into users table (name, email, role)
    const values = [
        caretaker.name,
        caretaker.email,
        caretaker.role
    ];
    const query = "INSERT INTO users (name, email, role) VALUES ($1, $2, $3)";
    const userResult = await db.query(query, values);

    // get the id from the newly created record
    const query2 = "SELECT id FROM users WHERE email = $1";
    const values2 = [caretaker.email];
    const idResult = await db.query(query2, values2);
    const id = idResult.rows[0].id;

    // insert into caretaker_properties table (caretaker_id)
    const values3 = [id];
    const query3 = "INSERT INTO caretaker_properties (caretaker_id) VALUES ($1)";
    return await db.query(query3, values3);
} // end of createCaretakerInstance