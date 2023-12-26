const db = require("../index");

exports.getAllPayments = async () => {
    const query = "SELECT * FROM payments";
    return await db.query(query);
}; // end of getAllPayments

exports.getPaymentInstance = async (id) => {
    const query = "SELECT * FROM payments WHERE id = $1";
    return await db.query(query, [id]);
}; // end of getPaymentInstance
