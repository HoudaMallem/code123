const CustomError = require("./CustomError");

class BadRequestError extends CustomError {
  constructor(errors = [], message = "Validation Error") {
    super("Validation Error", 400);

    this.name = "ValidationError";
    (this.message = message), (this.errors = errors ? errors : []);
    this.statusCode = 400;
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serializeErrors() {
    return {
      type: this.name,
      message: this.message,
      errors: this.errors.map((error) => ({
        field: error.context ? error.context.label : "",
        message: error.message ? error.message : "",
      })),
    };
  }
}

module.exports = BadRequestError;
