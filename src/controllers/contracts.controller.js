class ContractsController {
    constructor(pathPassed) {
        this.basePath = pathPassed;
        this.model = require(`${this.basePath}/main/contracts.model`);
    }

    getAllContracts = async (req, res, next) => {
        try {
            // get a specific contract:
            if (req.query.contract_id) {
                const result = await this.model.getAContract(req.query.contract_id);

                if (result instanceof Error)
                    throw new Error(`Error getting contract: ${result.message}`);

                return res.status(200).json({
                    data: result.rows[0]
                });
                // get all contracts:
            } else if (req.query.active) {
              const result = await this.model.getActiveContracts(req.query.active);
              if (result instanceof Error)
                  throw new Error(`Error getting active contracts: ${result.message}`);
                return res.status(200).json({
                    data: result.rows
                });
            } else {
                const contracts = await this.model.getAllContracts();

                if (contracts instanceof Error)
                    throw new Error(`Error getting contracts: ${contracts.message}`);

                res.status(200).json({
                    data: contracts.rows
                });
            }
        } catch(error){
            next(error);
        }
    } // end of getAllContracts

    addAContract = async (req, res, next) => {
        try{
            const contract = req.body;
            const tenant_id = req.body.tenant_id;

            if(!contract.tenant_id || !contract.contract_start || !contract.contract_end || !contract.rent || !contract.active)
                throw new Error(`The contract object is empty`);

            const result = await this.model.addAContract(contract);

            if(result instanceof Error)
                throw new Error(`Error adding contract: ${result.message}`);

            res.status(201).json({
                message: `Contract for tenant id:${tenant_id}  added successfully`,
                result: result
            });

        } catch(error){
            next(error);
        }
    } // end of addContract

    archiveContract = async (req, res, next) => {
        try{
            const contract_id = req.query.contract_id;
            const result = await this.model.archiveContract(contract_id);

            if(result instanceof Error)
                throw new Error(`Error archiving contract: ${result.message}`);

            res.status(200).json({
                message: `Contract with id:${contract_id} archived successfully`,
                result: result
            });
        } catch(error){
            next(error);
        }
    } // end of archiveContract

    updateAContract = async (req, res, next) => {
        try{
            const contract_id = req.query.contract_id;
            const updates = req.body;
            const result = await this.model.updateAContract(contract_id, updates);

            if(result instanceof Error)
                throw new Error(`Error updating contract: ${result.message}`);

            res.status(200).json({
                message: `Contract with id:${contract_id} updated successfully`,
                result: result
            });
        } catch(error){
            next(error);
        }
    } // end of updateAContract
}

module.exports = ContractsController;