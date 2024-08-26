const CustomError = require("./CustomError");

class ForbiddenError extends CustomError {
  constructor(message = "insufficient permissions") {
    super(message, 403);
    this.name = "Forbidden";
    this.statusCode = 403;

    Object.setPrototypeOf(this, ForbiddenError.prototype);
  }

  serializeErrors() {
    return {
      type: this.name,
      message: this.message,
    };
  }
}

module.exports = ForbiddenError;
