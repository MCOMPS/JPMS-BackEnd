class InvoicesController {
    constructor(pathPassed) {
        this.basePath = pathPassed;
        this.model = require(`${this.basePath}/main/invoices.model`);
    }

    getAllInvoices = async (req, res, next) => {
        try {
            // get a specific invoice:
            if (req.query.invoice_id) {
                const result = await this.model.getAnInvoice(req.query.invoice_id);

                if (result instanceof Error)
                    throw new Error(`Error getting invoice: ${result.message}`);

                return res.status(200).json({
                    data: result.rows[0]
                });
                // get all invoices:
            }
            const result = await this.model.getAllInvoices();
            if (result instanceof Error)
                throw new Error(`Error getting invoices: ${result.message}`);
            return res.status(200).json({
                data: result.rows
            });

        } catch(error){
            next(error);
        }
    } // end of getAllInvoices

    addAnInvoice = async (req, res, next) => {
        try {
            const result = await this.model.addAnInvoice(req.body);
            if (result instanceof Error)
                throw new Error(`Error adding invoice: ${result.message}`);
            return res.status(200).json({
                msg: `Invoice for ${req.body.tenant_id} added successfully`
            });
        } catch(error){
            next(error);
        }
    } // end of addAnInvoice

    updateAnInvoice = async (req, res, next) => {
        try {
            const result = await this.model.updateAnInvoice(req.query.invoice_id, req.body);
            if (result instanceof Error)
                throw new Error(`Error updating invoice: ${result.message}`);
            return res.status(200).json({
                msg: `Invoice ${req.query.invoice_id} updated successfully`
            });
        } catch(error){
            next(error);
        }
    } // end of updateAnInvoice

}

module.exports = InvoicesController;