class CustomError extends Error {
  constructor(message, statusCode = 400) {
    super(message);
    this.name = 'CustomError';
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, CustomError.prototype);
  }

  serializeErrors() {
    return {
      type: this.name,
      message: this.message,
   //  errors: this.errors,
    }

  }
}

module.exports = CustomError;