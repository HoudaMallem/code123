const userService = require("../services/userService.js");
const NotFoundError = require("../errors/NotFoundError.js");
const { jsonResponse, errorResponse } = require("../helper/response.js");

async function register(req, res) {
  try {
    const { email, password } = req.body;
    user = await userService.createUser(email, password);
    if (!user) {
      throw new NotFoundError("not found ");
    }
    return jsonResponse(res, user, 201);
  } catch (error) {
    return errorResponse(res, error);
  }
}
async function login(req, res) {
  try {
    const { email, password } = req.body;
    const token = await userService.checkToken(email, password);
    return jsonResponse(res, token);
  } catch (error) {
    return errorResponse(res, error);
  }
}

const ProductController = {
  register,
  login,
};

module.exports = ProductController;
