const express = require('express');
const productController = require('./controllers/productController.js');
const userController = require('./controllers/userController.js');
const {authenticationJWT, authorization } = require('./middleware/authMiddleware.js');
const {validate , validateAsync } = require('./middleware/validatoreMiddleware.js');
const  {productBodySchema, objectIdSchema , userRegisterSchema , userLoginSchema  } = require("./helper/validator.js");
const swaggerUi = require('swagger-ui-express');
const openapi = require('./doc/openapi.json');



const router = express.Router();

router.get('/api/v1/products/', authenticationJWT  ,authorization( ['owner', 'guest']) , productController.list );
router.post('/api/v1/products/',authenticationJWT  ,authorization(['owner','guest'] ) , validate(productBodySchema , "body" ) , productController.create);

router.get('/api/v1/products/:id/',authenticationJWT  ,authorization(['owner' ,'guest' ]  ) , validate(objectIdSchema , "params" )  , productController.get );
router.delete('/api/v1/products/:id/', authenticationJWT  ,authorization(['owner' , 'guest'] ) , validate(objectIdSchema , "params" ) , productController.remove );
router.put('/api/v1/products/:id/', authenticationJWT  ,authorization(['owner' , 'guest'] ) , validate(objectIdSchema , "params" ), validate(productBodySchema , "body" )  , productController.update );

router.post('/api/v1/login/', validate(userLoginSchema , "body" ) , userController.login);
router.post('/api/v1/register/', validateAsync(userRegisterSchema , "body" ), userController.register); 


router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapi));



module.exports = router