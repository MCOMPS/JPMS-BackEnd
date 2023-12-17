const db = require("../index");

exports.getAllUsers = async () => {
    const query = "SELECT * FROM users";
    return await db.query(query);
} // end of getAllUsers

exports.getUserInstance = async (id) => {
    const query = "SELECT * FROM users WHERE id = $1";
    return await db.query(query, [id]);
} // end of getUserInstance

exports.getUserByEmail = async (email) => {
    const query = "SELECT * FROM users WHERE email = $1";
    return await db.query(query, [email]);
} // end of getUserByEmail

exports.createUserInstance = async (user) => {
    const values = [
        user.name,
        user.email,
        user.role
    ];

    const query =
        "INSERT INTO users(" +
        "name, email, role)" +
        "VALUES ($1, $2, $3);"; // end of query

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

