class HTTP401 extends Error {
    constructor(message) {
        super(message);
        this.name = '401 Unauthorized';
        this.status = 401;
        this.message = message || 'Unauthorized';
    }
}

module.exports = HTTP401;