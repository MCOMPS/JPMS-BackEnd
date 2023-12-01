const db = require("../index");

exports.getAllExpenses = async () => {
    const query = "SELECT expense_id, property_id, month_year, amount_paid, notes\n" +
        "\tFROM public.apartment_expenses;";
    return await db.query(query);
}

exports.getAnExpense = async (expense_id) => {
    const query = "SELECT * FROM apartment_expenses WHERE expense_id = $1;";
    const values = [expense_id];
    return await db.query(query, values);
}

exports.addExpense = async (property_id, expense) => {
    const query = "INSERT INTO public.apartment_expenses(\n" +
        "\tproperty_id, month_year, amount_paid, notes)\n" +
        "\tVALUES ($1, $2, $3, $4);";

    if(!expense.notes){
        expense.notes = "";
    }

    const values = [property_id, expense.month_year, expense.amount_paid, expense.notes];

    const result = await db.query(query, values);

}

exports.updateExpense = async (expense_id, updates) => {
    const getExpenseQuery = "SELECT * FROM apartment_expenses WHERE expense_id = $1;";
    const getExpenseValues = [expense_id];
    const expense = await db.query(getExpenseQuery, getExpenseValues);
    let expenseObj = expense.rows[0];

    function updateExpense(expense, updates) {
        for (let key in updates) {
            if (expense.hasOwnProperty(key)) {
                expense[key] = updates[key];
            }
        }
    }

    updateExpense(expenseObj, updates);

    const updateExpenseQuery = "UPDATE apartment_expenses SET property_id = $1, month_year = $2, amount_paid = $3, notes = $4 WHERE expense_id = $5";
    const updateExpenseValues = [expenseObj.property_id, expenseObj.month_year, expenseObj.amount_paid, expenseObj.notes, expense_id];
    return await db.query(updateExpenseQuery, updateExpenseValues);

}

exports.deleteExpense = async (expense_id) => {
    const query = "DELETE FROM apartment_expenses WHERE expense_id = $1;";
    const values = [expense_id];
    return await db.query(query, values);
}