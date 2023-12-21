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

  // routing parameter implementation
  getUser = async (req, res, next) => {
    try {
      // Retrieve userid and email from params
      const { idORemail } = req.params;
      // if the variable is there then
      if (idORemail) {
        let getUser;
        // if its an email get the user by the email
        if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(idORemail)) {
          getUser = await this.model.getUserByEmail(idORemail);
        } else if (/^\d+$/.test(idORemail)) {
          // if its an Id get the usert by ID
          getUser = await this.model.getUserInstance(idORemail);
        } else {
          return res.status(400).json(null);
        }

        // check if the user exists
        if (getUser.rows.length > 0) {
          res.status(200).json(getUser.rows[0]);
        } else {
          res.status(404).json(null);
        }
      } else {
        throw new Error(" Parameter Email or ID must be provided.");
      }
    } catch (error) {
      next(error);
    }
  };

  createUser = async (req, res, next) => {
    try {
      const user = req.body;
  
      if (Object.keys(user).length === 0) {
        throw new Error("User is Empty");
      }
  
      const result = await this.model.createUserInstance(user);
  
      if (result) {
        res.status(201).json({
          success: true,
          message: "User Created Successfully",
        });
      }
    } catch (error) {
      next(error);
    }
  
  };

  checkUserPassword = (req,res,next)=>{
    try {
      
    } catch (error) {
      next(error);
    }
  }
} // end of UsersController



module.exports = UsersController;
