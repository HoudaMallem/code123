const BadRequestError = require("../errors/BadRequestError.js");
//const {  errorResponse  } = require("../helper/response.js");
module.exports = {
  upload(image) {
    if (!image) throw new BadRequestError([], "no image submitted  ");
    if (!/^image/.test(image.mimetype)) {
      throw new BadRequestError([], "the file should be a valid image !!!");
    }

    image.mv("uploads/" + image.name);
    return "uploads/" + image.name;
  },
};
