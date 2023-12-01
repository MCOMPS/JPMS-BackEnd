class HTTP403 extends Error {
    constructor(message) {
        super(message);
        this.name = "403 Forbidden";
        this.statusCode = 403;
        this.message = message || 'Forbidden';

    }
}

module.exports = HTTP403;