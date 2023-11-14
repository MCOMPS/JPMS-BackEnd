# JPMS Backend

How to use:

#### 1. Install:
```sh
npm install
```
Avoid using yarn.

#### 2. Run Development
```sh
npm run dev
```

#### TODO: Create Database
  * Copy the sql command below and run in postgres console or in pgAdmin query tool.
```sql
CREATE DATABASE jpms
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;
```
#### TODO: Create Models
  * Copy the model.sql script into postgres console or query tool in pgAdmin and run.
#### TODO: Populate Tables
  * Copy the populate.sql script into postgres console or query tool in pgAdmin and run.

## Other Commands:

#### Lint
```sh
npm run lint
```

#### Test
```sh
npm test
```
#### Run in production
```sh
npm start
```

<br />
Includes API Server utilities:

* [morgan](https://www.npmjs.com/package/morgan)
  * HTTP request logger middleware for node.js
* [helmet](https://www.npmjs.com/package/helmet)
  * Helmet helps you secure your Express apps by setting various HTTP headers. It's not a silver bullet, but it can help!
* [dotenv](https://www.npmjs.com/package/dotenv)
  * Dotenv is a zero-dependency module that loads environment variables from a `.env` file into `process.env`
* [cors](https://www.npmjs.com/package/cors)
  * CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
* [pg](https://www.npmjs.com/package/pg)
  * node-postgres is a Non-blocking PostgreSQL client for Node.js. 
  * Pure JavaScript and optional native libpq bindings.
* [express-promise-router](https://www.npmjs.com/package/express-promise-router)
  * express-promise-router is a simple wrapper for Express 4's Router that allows middleware to return promises. This package makes it simpler to write route handlers for Express when dealing with promises by reducing duplicate code.
<br>
<br>

Development utilities:

* [nodemon](https://www.npmjs.com/package/nodemon)
  * nodemon is a tool that helps develop node.js based applications by automatically restarting the node application when file changes in the directory are detected.
* [eslint](https://www.npmjs.com/package/eslint)
  * ESLint is a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code.
* [jest](https://www.npmjs.com/package/jest)
  * Jest is a delightful JavaScript Testing Framework with a focus on simplicity.
* [supertest](https://www.npmjs.com/package/supertest)
  * HTTP assertions made easy via superagent.


