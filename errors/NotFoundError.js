const CustomError = require("./CustomError");

class NotFoundError extends CustomError {
  constructor(message = 'Not found') {
    super(message, 404);
    this.name = "NotFoundError";
    this.statusCode = 404;

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors() {

    return {
      type: this.name,
      message: this.message
    }
  }
}

module.exports = NotFoundError;