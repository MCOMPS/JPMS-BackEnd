const HTTP400 = require('../lib/custom-errors/HTTP400');
const HTTP401 = require('../lib/custom-errors/HTTP401');
const HTTP403 = require('../lib/custom-errors/HTTP403');
const HTTP404 = require('../lib/custom-errors/HTTP404');

function errorHandler(err, req, res, next) {
    // Log the error (will use a logger in the future)
    console.log(`DATABASE ERROR: ${err.message}`);

    // Default error values
    let statusCode = 500;
    let errorMessage = 'Internal Server Error';

    // Check the error type and set appropriate status code and message
    if (err instanceof HTTP400) {
        statusCode = 400; // Bad Request
        errorMessage = err.message;
    } else if (err instanceof HTTP401) {
        statusCode = 401; // Unauthorized
        errorMessage = err.message;
    } else if (err instanceof HTTP403) {
        statusCode = 403; // Forbidden
        errorMessage = err.message;
    } else if (err instanceof HTTP404) {
        statusCode = 404; // Not Found
        errorMessage = err.message;
    }

    // Send the error response with the appropriate status code and message
    res.status(statusCode).json({
        error: errorMessage
    });
}

module.exports = errorHandler;
