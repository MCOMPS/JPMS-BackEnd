class CaretakerProperties {
  constructor(pathPassed) {
    this.basePath = pathPassed;
    this.model = require(`${this.basePath}/users/caretakerProperties.model`);
  } // end of constructor

  getAllCaretakers = async (req, res, next) => {
    try {
      // check if caretaker IDs are specified in the query
      const caretakerIds = req.query.id;
      if (caretakerIds) {
        // convert caretakerIds to an array if it's a single value
        const idArray = Array.isArray(caretakerIds)
          ? caretakerIds
          : [caretakerIds];

        // fetch caretakers for the specified IDs
        const caretakers = await Promise.all(
          idArray.map(async (id) => {
            const result = await this.model.getCaretakerInstance(id);

            if (result instanceof Error) {
              // handle errors for individual caretaker requests
              throw new Error(
                `Error getting caretaker with ID ${id}: ${result.message}`
              );
            }

            // return the caretaker if it exists, or null otherwise
            return result.rows.length > 0 ? result.rows[0] : null;
          })
        );

        return res.status(200).json(caretakers);
      }

      // if no specific caretaker IDs are requested, get all caretakers
      const { _start, _end } = req.query;
      const start = parseInt(_start) || 0;
      const end = parseInt(_end) || Infinity;

      const getAllCaretakers = await this.model.getAllCaretakers();
      if (getAllCaretakers instanceof Error) {
        // handle errors for fetching all caretakers
        throw new Error(
          `Error getting all caretakers: ${getAllCaretakers.message}`
        );
      }

      // apply pagination
      const paginatedCaretakers = getAllCaretakers.rows.slice(start, end);

      // return paginated caretakers
      res.status(200).json(paginatedCaretakers);
    } catch (error) {
      next(error);
    }
  }; // end of getAllCaretakers

  getCaretakerInstance = async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await this.model.getCaretakerInstance(id);

      if (result instanceof Error) {
        // handle errors for individual caretaker requests
        throw new Error(
          `Error getting caretaker with ID ${id}: ${result.message}`
        );
      }

      // return the caretaker if it exists, or null otherwise
      res.status(200).json(result.rows.length > 0 ? result.rows[0] : null);
    } catch (error) {
      next(error);
    }
  }; // end of getCaretakerInstance

  joinCaretakerProperties = async (req, res, next) => {
    try {
      const result = await this.model.joinCaretakerProperties();

      if (result instanceof Error) {
        // handle errors for individual caretaker requests
        throw new Error(
          `Error joining caretaker properties: ${result.message}`
        );
      }

      // return the caretaker if it exists, or null otherwise
      res.status(200).json(result.rows);
    } catch (error) {
      next(error);
    }
  }; // end of joinCaretakerProperties

  getJoinedCaretakerPropertiesInstance = async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await this.model.getJoinedCaretakerPropertiesInstance(id);

      if (result instanceof Error) {
        // handle errors for individual caretaker requests
        throw new Error(
          `Error getting caretaker with ID ${id}: ${result.message}`
        );
      }

      // return the caretaker if it exists, or null otherwise
      res.status(200).json(result.rows.length > 0 ? result.rows[0] : null);
    } catch (error) {
      next(error);
    }
  }; // end of getJoinedCaretakerPropertiesInstance

  createCaretakerInstance = async (req, res, next) => {
    try {
      const caretaker = req.body;
      const result = await this.model.createCaretakerInstance(caretaker);

      if (result instanceof Error) {
        // handle errors for individual caretaker requests
        throw new Error(
          `Error creating caretaker with ID ${caretaker.id}: ${result.message}`
        );
      }

      // return the caretaker if it exists, or null otherwise
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }; // end of createCaretakerInstance

  updateCaretakerInstance = async (req, res, next) => {
    try {
      const caretaker = req.body;
      const { id } = req.params;
      const result = await this.model.updateCaretakerInstance(caretaker, id);

      if (result instanceof Error) {
        // handle errors for individual caretaker requests
        throw new Error(
          `Error updating caretaker with ID ${id}: ${result.message}`
        );
      }

      // return the caretaker if it exists, or null otherwise
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }; // end of updateCaretakerInstance
} // end of class CaretakerProperties

module.exports = CaretakerProperties;
