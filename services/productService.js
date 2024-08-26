const BadRequestError = require("../errors/BadRequestError.js");
const NotFoundError = require("../errors/NotFoundError.js");
const models = require("../schema/models.js");
const { upload } = require("../helper/uploadImages.js");

async function getProducts(query) {
  try {
    const criteria = query.sortBy;
    const filter = query.filter;
    const filterObject = {};
    if (typeof filter !== "undefined" && filter !== "") {
      filterObject.name = { $regex: filter };
    }
    const model = models.Product.find(filterObject);
    if (typeof criteria !== "undefined" && criteria !== "") {
      const sortObject = {};
      sortObject[criteria] = 1;
      model.sort(sortObject);
    }
    const products = await model.exec();

    if (!products) {
      throw new NotFoundError("product not found");
    }
    return products;
  } catch (error) {
    throw new BadRequestError(error.details, "validation error");
  }
}

async function createProduct(req) {
  const query = req.body;
  const files = req.files;
  var imageName = "";
  if (files !== undefined && files !== null && files.image !== undefined)
    imageName = upload(files.image);
  const product = new models.Product({
    name: query.name,
    description: query.description,
    price: query.price,
    category: query.category,
    image: imageName,
  });

  product.save();

  if (!product) {
    throw new BadRequestError([], "product not found");
  }
  return product;
}

async function removeProduct(id) {
  let product = await models.Product.deleteOne({ _id: id });

  if (!product) {
    throw new NotFoundError("product not found");
  }

  return product;
}
async function getProduct(id) {
  let products = await models.Product.findOne({ _id: id });
  if (!products) {
    throw new NotFoundError("product not found");
  }
  return products;
}
async function updateProduct(query, id) {
  let product = await models.Product.findOne({ _id: id });
  if (!product) {
    throw new NotFoundError("product not found");
  }
  (product.name = query.name),
    (product.description = query.description),
    (product.price = query.price),
    (product.category = query.category),
    //image:  query.image
    product.save();

  return product;
}
const productService = {
  getProduct,
  getProducts,
  createProduct,
  removeProduct,
  updateProduct,
};
module.exports = productService;
