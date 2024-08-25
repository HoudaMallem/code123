const productService = require("../services/productService.js");
const NotFoundError = require("../errors/NotFoundError");
const {jsonResponse , errorResponse  } = require("../helper/response.js");





async function create(req, res) {
  try {
      const product = await productService.createProduct(req  );
      if (!product) {
        throw new NotFoundError('not found ');
      }
      return jsonResponse(res  , product , 201) 
  } catch (error) {
   return errorResponse(res  , error) 
 }
}
async function get(req, res) {
  try {
    const products = await productService.getProduct(req.params.id );
    return jsonResponse(res  , products ) 
  } catch (error) {
    return errorResponse(res  , error) 
  }
}
async function list(req, res) {


  try {
    const products = await productService.getProducts( {...req.query} );
    if (!products) {
      throw new NotFoundError('Product not found');
    }
    return jsonResponse(res  , products) 
  } catch (error) {
    return errorResponse(res  , error) 
  }
}
async function remove(req, res) {
 try {
    await productService.removeProduct(req.params.id );
    return jsonResponse(res  , "product was successfully deleted" ) 
  } catch (error) {
    return errorResponse(res  , error) 
  }
}
async function update(req, res) {
  try {
    const product = await productService.updateProduct(req.body , req.params.id );
    if (!product) {
      throw new NotFoundError('Product not found');
    }

    return jsonResponse(res  , product , 201) 
  } catch (error) {
    return errorResponse(res  , error)
  }
}
const ProductController = {
  get,
  create,
  list,
  remove,
  update
};

module.exports = ProductController;
