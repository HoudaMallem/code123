const CustomError = require("./CustomError");

class UnauthorizedError extends CustomError {
  constructor(message = 'lacks valid authentication credentials') {
    super(message, 401);
    this.name = "Unauthorized";
    this.statusCode = 401;

    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }

  serializeErrors() {
    return {
      type: this.name,
      message: this.message
    }
  }
}

module.exports = UnauthorizedError;