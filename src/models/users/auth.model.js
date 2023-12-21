const db = require("../index");

exports.checkUser = async (email) => {
    const query = "SELECT * FROM users WHERE email = $1";
    return await db.query(query, [email]);
} // end of authUser

exports.getUserInstance = async (id) => {
    const query = "SELECT id, name, email, role FROM users WHERE id = $1";
    return await db.query(query, [id]);
} // end of getUserInstance

exports.getTokenByUserId = async (user_id) => {
    const query = "SELECT token FROM sessions WHERE user_id = $1";
    return await db.query(query, [user_id]);
} // end of getTokenByUserId

exports.getToken = async (token) => {
    const query = "SELECT token FROM sessions WHERE token = $1";
    return await db.query(query, [token]);
} // end of getToken

exports.createToken = async (user_id, token) => {
    const query = "INSERT INTO sessions (user_id, token) VALUES ($1, $2)";
    return await db.query(query, [user_id, token]);
} // end of createToken

exports.deleteToken = async (token) => {
    const query = "DELETE FROM sessions WHERE token = $1";
    return await db.query(query, [token]);
} // end of deleteToken

