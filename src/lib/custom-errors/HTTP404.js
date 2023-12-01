class HTTP404 extends Error {
  constructor(message) {
    super(message);
    this.name = '404 Not Found';
    this.status = 404;

    if(message === undefined)
      this.message = this.name;
    else
      this.message = message + ' Not Found, 404';

  }
}

module.exports = HTTP404;