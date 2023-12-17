const IDgenerator = require("../utils/IDgenerator");
const HTTP404 = require("../lib/custom-errors/HTTP404");

class PropertiesController {
  constructor(pathPassed) {
    this.basePath = pathPassed;
    this.model = require(`${this.basePath}/main/properties.model`);
  }

  getAllProperties = async (req, res, next) => {
    try {
      // Check if property IDs are specified in the query
      const propertyIds = req.query.id;

      if (propertyIds) {
        // Convert propertyIds to an array if it's a single value
        const idArray = Array.isArray(propertyIds) ? propertyIds : [propertyIds];

        // Fetch properties for the specified IDs
        const properties = await Promise.all(
          idArray.map(async (id) => {
            const result = await this.model.getPropertyInstance(id);

            if (result instanceof Error) {
              // Handle errors for individual property requests
              throw new Error(`Error getting property with ID ${id}: ${result.message}`);
            }

            // Return the property if it exists, or null otherwise
            return result.rows.length > 0 ? result.rows[0] : null;
          })
        );

        return res.status(200).json(properties);
      }

      // If no specific property IDs are requested, get all properties
      const { _start, _end } = req.query;
      const start = parseInt(_start) || 0;
      const end = parseInt(_end) || Infinity;

      const allProperties = await this.model.getAllProperties();

      if (allProperties instanceof Error) {
        // Handle errors for fetching all properties
        throw new Error(`Error getting all properties: ${allProperties.message}`);
      }

      // Apply pagination
      const paginatedProperties = allProperties.rows.slice(start, end);

      // Return paginated properties
      res.status(200).json(paginatedProperties);
    } catch (error) {
      // Handle errors, you may want to check for specific error types here
      next(error);
    }
  };
  
  getProperty = async (req, res, next) => {
    try {
      const { id } = req.params;
      // 1. query the database
      const result = await this.model.getPropertyInstance(id);
     
      // 2. if the database returned an error, throw an error
      if (result instanceof Error)
        throw new Error(`Error getting propertys: ${result.message}`);
      if (result.rows.length === 0)
        throw new HTTP404(`No property with id ${id}`);
      
      // 3. else, return the property
      res.status(200).json(result.rows[0]);
    } catch (error) {
      next(error);
    }
  };

  createPropertyInstance = async (req, res, next) => {
    try {
      // 1. get the property from the request body
      const property = req.body;

      function isObjectNotEmpty(obj) {
        return Object.keys(obj).length !== 0;
      }

      // 2. validate the property object
      if (!isObjectNotEmpty(property))
        throw new Error(`The property object is empty`);

      // 3. query the database
      const result = await this.model.createPropertyInstance(property);
      res.status(201).json({
        message: "Property created successfully",
        result: result,
      });
    } catch (error) {
      next(error);
      console.log(error);
    }
  }; // end of createPropertyInstance

  updatePropertyInstance = async (req, res, next) => {
    try {
      const id = req.params.id;
      const updates = req.body;

      // if updates object is empty, throw an error
      if (Object.keys(updates).length === 0)
        throw new Error(`The updates object is empty`);

      const result = await this.model.updatePropertyInstance(
        id,
        updates
      );

      res.status(200).json({
        message: `Property with id ${id} updated successfully`,
        result: result,
      });
    } catch (error) {
      next(error);
    }
  }; // end of updatePropertyInstance

  deleteProperty = async (req, res, next) => {
    try {
      const id = req.query.id;

      const result = await this.model.deleteProperty(id);
      res.status(200).json({
        message: `Property with id ${id} deleted successfully`,
        propertyData: result.rows[0],
      });
    } catch (error) {
      next(error);
    }
  }; // end of deleteProperty
} // end of PropertiesController

module.exports = PropertiesController;
