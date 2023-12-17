class UsersController {
  constructor(pathPassed) {
    this.basePath = pathPassed;
    this.model = require(`${this.basePath}/users/users.model`);
  }

  getAllUsers = async (req, res, next) => {
    try {
      // check if user IDs are specified in the query
      const userIds = req.query.id;

      if (userIds) {
        // convert userIds to an array if it's a single value
        const idArray = Array.isArray(userIds) ? userIds : [userIds];

        // fetch users for the specified IDs
        const users = await Promise.all(
          idArray.map(async (id) => {
            const result = await this.model.getUserInstance(id);

            if (result instanceof Error) {
              // handle errors for individual user requests
              throw new Error(
                `Error getting user with ID ${id}: ${result.message}`
              );
            }

            // return the user if it exists, or null otherwise
            return result.rows.length > 0 ? result.rows[0] : null;
          })
        );

        return res.status(200).json(users);
      }

      // if no specific user IDs are requested, get all users
      const { _start, _end } = req.query;
      const start = parseInt(_start) || 0;
      const end = parseInt(_end) || Infinity;

      const getAllUsers = await this.model.getAllUsers();
      if (getAllUsers instanceof Error) {
        // handle errors for fetching all users
        throw new Error(`Error getting all users: ${getAllUsers.message}`);
      }

      // apply pagination
      const paginatedUsers = getAllUsers.rows.slice(start, end);

      // return paginated users
      res.status(200).json(paginatedUsers);
    } catch (error) {
      next(error);
    }
  }; // end of getAllUsers
} // end of UsersController

module.exports = UsersController;