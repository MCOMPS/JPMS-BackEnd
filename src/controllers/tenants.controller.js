class TenantsController {

    constructor(pathPassed) {
        this.basePath = pathPassed;
        this.model = require(`${this.basePath}/main/tenants.model`);
    }

    getAllTenants = async (req, res, next) => {
        if (req.query.tenant_id){

            try{

                const result = await this.model.getTenant(req.query.tenant_id);
                if (result instanceof Error)
                    throw new Error(`Error getting tenant: ${result.message}`);
                return res.status(200).json({
                    data: result.rows[0]
                });

            } catch(error) {
                next(error);
            }

        } 

        try {

            const property_id = req.query.property_id;
            const results = await this.model.getAllTenants(property_id);

            if(results instanceof Error)
                throw new Error(`Error getting tenants: ${results.message}`);

            res.status(200).json({
                data: results.rows
            });
        } catch(error){
            next(error);
        }

    } // end of getAllTenants

    addTenant = async (req, res, next) => {
        const property_id = req.query.property_id;
        const room_id = req.query.room_id;
        const tenant = req.body;

        try {

            const result = await this.model.addTenant(property_id, room_id, tenant);
            if (result instanceof Error)
                throw new Error(`Error adding tenant: ${result.message}`);
            res.status(201).json({
                message: `Tenant for property id:${property_id} and room_id:${room_id} added successfully`,
            });

        } catch(error){
            next(error);
        }

    } // end of addTenant

    updateTenant = async (req, res, next) => {
        const tenant_id = req.query.tenant_id;
        const updates = req.body;
        try {
            const result = await this.model.updateTenant(tenant_id, updates);
            if (result instanceof Error)
                throw new Error(`Error updating tenant: ${result.message}`);
            res.status(201).json({
                message: `Tenant id:${tenant_id} updated successfully`,
            });
        } catch(error){
            next(error);
        }
    }

    moveTenantToRoom = async (req, res, next) => {
        const tenant_id = req.query.tenant_id;
        const room_id = req.query.room_id;

        let message = `Tenant id:${tenant_id} moved successfully to room_id:${room_id}`;
        try {
            const result = await this.model.moveToRoom(room_id, tenant_id);
            if (result instanceof Error)
                throw new Error(`Error moving tenant: ${result.message}`);

            let statusCode = 201;
            if(result.result === false)
                statusCode = 400;

            res.status(statusCode).json(result);
        } catch (error) {
            next(error);
        }
    } // end of moveTenantToRoom

    // moveTenantToApartment = async (req, res, next) => {
    //
    // }

    // archiveTenant = async (req, res, next) => {
    //
    // }

}

module.exports = TenantsController;