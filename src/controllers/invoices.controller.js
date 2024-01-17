class InvoicesController {
    constructor(pathPassed) {
        this.basePath = pathPassed;
        this.model = require(`${this.basePath}/main/invoices.model`);
    }

    getAllInvoices = async (req, res, next) => {
        try {
            // check if invoice ids are specified in the params
            const invoiceIds = req.query.id;
            
            if (invoiceIds) {
                // convert invoiceIds to an array if it's a single value
                const idArray = Array.isArray(invoiceIds)
                    ? invoiceIds
                    : [invoiceIds];

                // fetch invoices for the specified ids
                const invoices = await Promise.all(
                    idArray.map(async (id) => {
                        const result = await this.model.getAnInvoice(id);
                        if (result instanceof Error) {
                            // handle errors for individual invoice requests
                            throw new Error(
                                `Error getting invoice with id ${id}: ${result.message}`
                            );
                        }
                        // return the invoice if it exists, or null otherwise
                        return result.rows.length > 0 ? result.rows[0] : null;
                    })
                );

                return res.status(200).json(invoices);
            }

            // if no specific invoice ids are requested, get all invoices
            const { _start, _end } = req.query;
            const start = parseInt(_start) || 0;
            const end = parseInt(_end) || Infinity;

            const allInvoices = await this.model.getAllInvoices();
            if (allInvoices instanceof Error) {
                // handle errors for fetching all invoices
                throw new Error(`Error getting all invoices: ${allInvoices.message}`);
            }

            // return the requested invoices
            return res.status(200).json(allInvoices.rows.slice(start, end));

        } catch(error){
            next(error);
        }
    }; // end of getAllInvoices

    getAnInvoice = async (req, res, next) => {
        try {

            const result = await this.model.getAnInvoice(req.params.id);
            if (result instanceof Error)
                throw new Error(`Error getting invoice: ${result.message}`);

            return res.status(200).json(result.rows[0]);

        } catch(error){
            next(error);
        }
    }; // end of getAnInvoice

    // getAllInvoices = async (req, res, next) => {
    //     try {
    //         // get a specific invoice:
    //         if (req.query.invoice_id) {
    //             const result = await this.model.getAnInvoice(req.query.invoice_id);

    //             if (result instanceof Error)
    //                 throw new Error(`Error getting invoice: ${result.message}`);

    //             return res.status(200).json({
    //                 data: result.rows[0]
    //             });
    //             // get all invoices:
    //         }
    //         const result = await this.model.getAllInvoices();
    //         if (result instanceof Error)
    //             throw new Error(`Error getting invoices: ${result.message}`);
    //         return res.status(200).json({
    //             data: result.rows
    //         });

    //     } catch(error){
    //         next(error);
    //     }
    // } // end of getAllInvoices

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