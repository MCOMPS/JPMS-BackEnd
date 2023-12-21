class Auth {
  constructor(pathPassed) {
    this.basePath = pathPassed;
    this.model = require(`${this.basePath}/users/auth.model`);
    
  } // end of constructor

  login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      // check if user exists 
      const userInDb = await this.model.checkUser(email);

      if (userInDb instanceof Error)
        throw new Error(`Error checking user: ${userInDb.message}`);

      if (userInDb.rows.length === 0) throw new Error(`User not found`);

      const user = userInDb.rows[0];
      // Bro shouldn't we implement bcrypt.compare here ???
      
      if (user.password_hashed !== password) throw new Error(`Wrong password`);
      // check if user already has a token
      const tokenInDb = await this.model.getTokenByUserId(user.id);
      if (tokenInDb instanceof Error)
        throw new Error(`Error checking token: ${tokenInDb.message}`);

      // if user already has a token, delete it
      if (tokenInDb.rows.length > 0) {
        const deleteToken = await this.model.deleteToken(
          tokenInDb.rows[0].token
        );
        if (deleteToken instanceof Error)
          throw new Error(`Error deleting token: ${deleteToken.message}`);
      }

      // generate a new token
      const token = Math.random().toString(36).substr(2);
      const createToken = await this.model.createToken(user.id, token);
      if (createToken instanceof Error)
        throw new Error(`Error creating token: ${createToken.message}`);

      // return the token
      res
        .status(200)
        .json({
          token: token,
          user: { name: user.name, email: user.email, role: user.role },
        });
    } catch (error) {
      next(error);
    }
  }; // end of login

  logout = async (req, res, next) => {
    try {
      const { token } = req.body;

      // check if token exists
      const tokenInDb = await this.model.getToken(token);
      if (tokenInDb instanceof Error)
        throw new Error(`Error checking token: ${tokenInDb.message}`);

      if (tokenInDb.rows.length === 0) throw new Error(`Token not found`);

      // delete token
      const deleteToken = await this.model.deleteToken(token);
      if (deleteToken instanceof Error)
        throw new Error(`Error deleting token: ${deleteToken.message}`);

      res.status(200).json({ message: `Logout successful` });
    } catch (error) {
      next(error);
    }
  }; // end of logout

  check = async (req, res, next) => {
    try {
      const { token } = req.body;

      // check if token exists
      const tokenInDb = await this.model.getToken(token);
      if (tokenInDb instanceof Error)
        throw new Error(`Error checking token: ${tokenInDb.message}`);

      if (tokenInDb.rows.length === 0) throw new Error(`Token not found`);

      // return the token in res:
        res.status(200).json({ token: tokenInDb.rows[0].token });

    
    } catch (error) {
      next(error);
    }
  }; // end of check
}

module.exports = Auth;
