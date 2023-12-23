const db = require("../index");
const bcrypt = require('bcrypt');

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

exports.checkPassword = async (email, password)=>{
    const query = "SELECT * FROM users WHERE email = $1";
    const result = await db.query(query, [email]);
    if(result.rows.length === 0){
        throw new Error("User not found");
    }
    const user = result.rows[0];
    const check = await bcrypt.compare(password, user.password_hashed);
    return check;
}

exports.createUserInstance = async (name, email, password, role) => {
    // hash user password
    const password_hashed = await bcrypt.hash(password, 10);
    const values = [
        name,
        email,
        role,
        password_hashed
    ];

    const query =
        "INSERT INTO users(" +
        "name, email, role, password_hashed)" +
        "VALUES ($1, $2, $3, $4);"; // end of query

    return await db.query(query, values);
}

exports.updateUserInstance = async (id, updates) => {
    const getUserQuery = "SELECT * FROM users WHERE id = $1";
    const userResult = await db.query(getUserQuery, [id]);

    if (userResult.rows.length === 0) {
        throw new Error("User not found");
    }

    const userObj = userResult.rows[0];
    // 2. check which fields need to be updated from "updates" object
    function updateUser(user, updates) {
        for (let key in updates) {
            if (user.hasOwnProperty(key)) {
                user[key] = updates[key];
            }
        }
    } // end of service function: updateUser 

    // 3. update the userObj with the updates
    updateUser(userObj, updates);

    const updateQuery =
        "UPDATE users SET " +
        "name = $1, email = $2, role = $3 " +
        "WHERE id = $4";

    return await db.query(updateQuery, [
        userObj.name,
        userObj.email,
        userObj.role,
        id
    ]);
} // end of updateUserInstance

exports.deleteUserInstance = async (id) => {
    const query = "DELETE FROM users WHERE id = $1";
    return await db.query(query, [id]);
} // end of deleteUserInstance