class HTTP400 extends Error {
    constructor(message) {
        super(message);
        this.name = '400 Bad Request';
        this.status = 400;
        this.message = message || 'Bad Request';
    }
}

module.exports = HTTP400;