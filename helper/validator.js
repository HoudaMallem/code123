
const mongoose = require("mongoose")
const models = require("../schema/models.js");
const Joi = require('joi');

function isObjectIdValid(value, helpers) {
  const ObjectId = mongoose.Types.ObjectId;
  if (!ObjectId.isValid(value)){
    helpers.message('product id is not in valid format  ')
    return helpers.error('id not valid');
  }
  return value
}

async function isUniqueEmail(value, helpers) {
  const user = await models.User.findOne({ email: value })
  if (user){
    return helpers.error('email already exists');
  }
  return value
}

module.exports = {
   productBodySchema : Joi.object({
    name: Joi.string().required(),
    description : Joi.string(),
    category : Joi.string().required(),
    price  : Joi.string().required(),
  }),

   objectIdSchema : Joi.object({
    id: Joi.string().custom(isObjectIdValid, 'custom validation').required()
  }),
  userRegisterSchema : Joi.object({
    email: Joi.string().email(),
    password : Joi.string().required(),
  }),
  userLoginSchema : Joi.object({
    email: Joi.string().email(),
    password : Joi.string().required(),
  })

}
