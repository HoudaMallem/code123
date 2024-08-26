const { errorResponse } = require("../helper/response.js");
const BadRequestError = require("../errors/BadRequestError.js");

module.exports = {
  validate(schema, path) {
    return (req, res, next) => {
      const { error } = schema.validate(req[path]);
      if (error) {
        return errorResponse(
          res,
          new BadRequestError(error.details, "validation error")
        );
      }
      next();
    };
  },
  validateAsync(schema, path) {
    return (req, res, next) => {
      const { error } = schema.validateAsync(req[path]);
      if (error) {
        return errorResponse(
          res,
          new BadRequestError(error.details, "validation error")
        );
      }
      next();
    };
  },
};
