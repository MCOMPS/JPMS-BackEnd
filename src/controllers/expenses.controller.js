const IDgenerator = require('../utils/IDgenerator');

class ExpensesController {
    constructor(pathPassed) {
        this.basePath = pathPassed;
        this.model = require(`${this.basePath}/main/expenses.model`);
    }

    getAllExpenses = async (req, res, next) => {
        try{
            
            // get a specific expense:
            if(req.query.expense_id){
                const result = await this.model.getAnExpense(req.query.expense_id);

                if(result instanceof Error)
                    throw new Error(`Error getting expense: ${result.message}`);

                return res.status(200).json(result.rows[0]);
            }

            // get all expenses:
            const expenses = await this.model.getAllExpenses();

            if(expenses instanceof Error)
                throw new Error(`Error getting expenses: ${expenses.message}`);

            res.status(200).json(expenses.rows);

        } catch(error){
            next(error);
        }
    }

    addExpense = async (req, res, next) => {
        try{
            const expense = req.body;
            const property_id = req.query.property_id;

            if(!expense.month_year || !expense.amount_paid)
                throw new Error(`The expense object is empty`);

            const result = await this.model.addExpense(property_id, expense);

            if(result instanceof Error)
                throw new Error(`Error adding expense: ${result.message}`);

            res.status(201).json({
                message: `Expense for property id:${property_id}  added successfully`,
                result: result
            });

        } catch(error){
            next(error);
        }
    }

    updateExpense = async (req, res, next) => {
        const expense_id = req.query.expense_id;
        const updates = req.body;

        try {
            const result = await this.model.updateExpense(expense_id, updates);
            if(result instanceof Error)
                throw new Error(`Error updating expense: ${result.message}`);

            res.status(200).json({
                message: `Expense id=${expense_id} updated successfully`,
                result: result
            });
        } catch (error) {
            next(error);
        }

    }

    deleteExpense = async (req, res, next) => {
        const expense_id = req.query.expense_id;
        try {
            const result = await this.model.deleteExpense(expense_id);
            if(result instanceof Error)
                throw new Error(`Error deleting expense: ${result.message}`);
            res.status(200).json({
               message: `Expense id=${expense_id} deleted successfully`,
            });
        } catch(error) {
            next(error);
        }
    }
}

module.exports = ExpensesController;