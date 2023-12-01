const db = require("../mock-db.json");

exports.getAllUsers = () => {
    return { rows: db.users };
}

exports.createUser = (user_id, user) => {
    const newUser = {
        user_id,
        ...user
    };
    db.users.push(newUser);
    return { rows: newUser };
}

exports.findUserByUsername = (username) => {
    const user = db.users.find(user => user.username === username);
    // returns the user OBJECT
    return { rows: user };
}

exports.findUserByRole = (role) => {
    const users = db.users.filter(user => user.role === role);
    // returns an ARRAY of users
    return { rows: users };
}