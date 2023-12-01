const IDgenerator = require('../../utils/IDgenerator');
const db = require("../index");

exports.getAllInvoices = async () => {
    const query = "select * from invoices";
    return await db.query(query);
}

exports.getAnInvoice = async (invoice_id) => {
    const query = "select * from invoices where invoice_id=$1";
    return await db.query(query, [invoice_id]);
}

exports.addAnInvoice = async (invoiceObject) => {
    let query;
    let queryValues;
    const invoice_id = IDgenerator.generateInvoiceId();
    if(!invoiceObject.notes){
        query = "insert into invoices (invoice_id, tenant_id, invoice_date, amount, amount_paid) values ($1, $2, $3, $4, $5)";
        queryValues = [invoice_id, invoiceObject.tenant_id, invoiceObject.invoice_date, invoiceObject.amount, invoiceObject.amount_paid];
    } else {
        query = "insert into invoices (invoice_id, tenant_id, invoice_date, amount, amount_paid, notes) values ($1, $2, $3, $4, $5, $6)";
        queryValues = [invoice_id, invoiceObject.tenant_id, invoiceObject.invoice_date, invoiceObject.amount, invoiceObject.amount_paid, invoiceObject.notes];
    }
    return await db.query(query, queryValues);
} // end of addAnInvoice

exports.updateAnInvoice = async (invoice_id, updates) => {
    const getInvoiceQuery = "SELECT * FROM invoices WHERE invoice_id = $1;";
    const getInvoiceValues = [invoice_id];
    const invoice = await db.query(getInvoiceQuery, getInvoiceValues);
    let invoiceObj = invoice.rows[0];

    function updateInvoice(invoice, updates) {
        for (let key in updates) {
            if (invoice.hasOwnProperty(key)) {
                invoice[key] = updates[key];
            }
        }
    }

    updateInvoice(invoiceObj, updates);

    const updateInvoiceQuery = "UPDATE invoices SET tenant_id = $1, invoice_date = $2, amount = $3, amount_paid = $4, notes = $5 WHERE invoice_id = $6";
    const updateInvoiceValues = [invoiceObj.tenant_id, invoiceObj.invoice_date, invoiceObj.amount, invoiceObj.amount_paid, invoiceObj.notes, invoice_id];
    return await db.query(updateInvoiceQuery, updateInvoiceValues);
} // end of updateAnInvoice









