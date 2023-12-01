const Router = require('express-promise-router');
const router = new Router();

const ExpensesController = require("../../controllers/expenses.controller");

module.exports = (modelPath) => {
    const controller = new ExpensesController(modelPath);
    router.get('/', controller.getAllExpenses);
    router.post('/', controller.addExpense);
    router.put('/', controller.updateExpense);
    router.delete('/', controller.deleteExpense);

    return router;
}