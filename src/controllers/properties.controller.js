const IDgenerator = require("../utils/IDgenerator");

class PropertiesController {
  constructor(pathPassed) {
    this.basePath = pathPassed;
    this.model = require(`${this.basePath}/main/properties.model`);
  }

  getAllProperties = async (req, res, next) => {
    try {
      // get a property instance given property_id
      if (req.query.property_id) {
        const result = await this.model.getPropertyInstance(
          req.query.property_id
        );

        if (result instanceof Error)
          throw new Error(`Error getting property: ${result.message}`);

        return res.status(200).json(result.rows[0]);
      }

      // 1. query the database
      const properties = await this.model.getAllProperties();

      // 2. if the database returned an error, throw an error
      if (properties instanceof Error)
        throw new Error(`Error getting properties: ${properties.message}`);

      // 3. else, return the propert
      res.status(200).json(properties.rows);
    } catch (error) {
      next(error);
    }
  }; // end of getAllProperties

  getProperty = async (req, res, next) => {
    try {
      const { property_id } = req.params;
      // 1. query the database
      const result = await this.model.getPropertyInstance(property_id);
     
      // 2. if the database returned an error, throw an error
      if (result instanceof Error)
        throw new Error(`Error getting propertys: ${result.message}`);

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
      const property_id = req.query.property_id;
      const updates = req.body;

      // if updates object is empty, throw an error
      if (Object.keys(updates).length === 0)
        throw new Error(`The updates object is empty`);

      const result = await this.model.updatePropertyInstance(
        property_id,
        updates
      );

      res.status(200).json({
        message: `Property with id ${property_id} updated successfully`,
        result: result,
      });
    } catch (error) {
      next(error);
    }
  }; // end of updatePropertyInstance

  deleteProperty = async (req, res, next) => {
    try {
      const property_id = req.query.property_id;

      const result = await this.model.deleteProperty(property_id);
      res.status(200).json({
        message: `Property with id ${property_id} deleted successfully`,
        propertyData: result.rows[0],
      });
    } catch (error) {
      next(error);
    }
  }; // end of deleteProperty
} // end of PropertiesController

module.exports = PropertiesController;
