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
                    console.log(req.user.role)
                    if (roles.includes(req.user.role)){ 
          
                        next();
                    } else {
            
                        return errorResponse(res  , new ForbiddenError()) 
                        
                    }
            
            };
         
      
    }
}