class TenantsController {
  constructor(pathPassed) {
    this.basePath = pathPassed;
    this.model = require(`${this.basePath}/main/tenants.model`);
  }

  getAllTenants = async (req, res, next) => {
    try {
      // check if tenant ids are specified in the query
      const tenantIds = req.query.id;
      if (tenantIds) {
        // convert tenantIds to an array if it's a single value
        const idArray = Array.isArray(tenantIds) ? tenantIds : [tenantIds];

        // fetch tenants for the specified ids
        const tenants = await Promise.all(
          idArray.map(async (id) => {
            const result = await this.model.getTenant(id);
            if (result instanceof Error) {
              // handle errors for individual tenant requests
              throw new Error(
                `Error getting tenant with id ${id}: ${result.message}`
              );
            }
            // return the tenant if it exists, or null otherwise
            return result.rows.length > 0 ? result.rows[0] : null;
          })
        );

        return res.status(200).json(tenants);
      }

      // if no specific tenant ids are requested, get all tenants
      const { _start, _end } = req.query;
      const start = parseInt(_start) || 0;
      const end = parseInt(_end) || Infinity;

      const allTenants = await this.model.getAllTenants();
      if (allTenants instanceof Error) {
        // handle errors for fetching all tenants
        throw new Error(`Error getting all tenants: ${allTenants.message}`);
      }

      // apply pagination
      const paginatedTenants = allTenants.rows.slice(start, end);

      // return paginated tenants
      res.status(200).json(paginatedTenants);
    } catch (error) {
      next(error);
    }
  }; // end of getAllTenants

  getTenant = async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await this.model.getTenant(id);
      if (result instanceof Error) {
        // handle errors for individual tenant requests
        throw new Error(
          `Error getting tenant with id ${id}: ${result.message}`
        );
      }
      // return the tenant if it exists, or null otherwise
      return res
        .status(200)
        .json(result.rows.length > 0 ? result.rows[0] : null);
    } catch (error) {
      next(error);
    }
  }; // end of getTenant

  getTenantsByPropertyId = async (req, res, next) => {
    if (req.query.tenant_id) {
      try {
        const result = await this.model.getTenant(req.query.tenant_id);
        if (result instanceof Error)
          throw new Error(`Error getting tenant: ${result.message}`);
        return res.status(200).json({
          data: result.rows[0],
        });
      } catch (error) {
        next(error);
      }
    }

    try {
      const property_id = req.query.property_id;
      const results = await this.model.getTenantsByPropertyId(property_id);

      if (results instanceof Error)
        throw new Error(`Error getting tenants: ${results.message}`);

      res.status(200).json({
        data: results.rows,
      });
    } catch (error) {
      next(error);
    }
  }; // end of getAllTenants

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
    } catch (error) {
      next(error);
    }
  }; // end of addTenant

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
    } catch (error) {
      next(error);
    }
  };

  moveTenantToRoom = async (req, res, next) => {
    const tenant_id = req.query.tenant_id;
    const room_id = req.query.room_id;

    let message = `Tenant id:${tenant_id} moved successfully to room_id:${room_id}`;
    try {
      const result = await this.model.moveToRoom(room_id, tenant_id);
      if (result instanceof Error)
        throw new Error(`Error moving tenant: ${result.message}`);

      let statusCode = 201;
      if (result.result === false) statusCode = 400;

      res.status(statusCode).json(result);
    } catch (error) {
      next(error);
    }
  }; // end of moveTenantToRoom

  // moveTenantToApartment = async (req, res, next) => {
  //
  // }

  // archiveTenant = async (req, res, next) => {
  //
  // }
}

module.exports = TenantsController;
