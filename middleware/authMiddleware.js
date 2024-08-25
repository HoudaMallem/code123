const {  errorResponse  } = require("../helper/response.js");
const jwt = require('jsonwebtoken');
const CONFIG = require('../setting.js');
const UnauthorizedError = require("../errors/UnauthorizedError.js");
const ForbiddenError = require("../errors/ForbiddenError.js");

module.exports = {
    authenticationJWT(req, res, next) {
        try{
            const token = req.headers.authorization; 
            jwt.verify(token, CONFIG.SECRET_KEY, (err, user) => {
                if (err) throw new UnauthorizedError()
            
                req.user = user;
                next();
            });
        } catch (error) {
            return errorResponse(res  , error) 
        }
    },
    authorization(roles) {
      
            return (req, res, next)  =>{
           
                    if (roles.includes(req.user.role)){ 
                   // if (req.user.role in roles) {
                        next();
                    } else {
            
                        return errorResponse(res  , new ForbiddenError()) 
                        
                    }
            
            };
         
      
    }
}