
const BadRequestError = require("../errors/BadRequestError.js");
const {  errorResponse  } = require("../helper/response.js");
module.exports = {
    upload(res , image ){
        if (!image) 
            return    errorResponse(res  , new BadRequestError([] ,  "no image submitted  "  ) ) 
        if (!/^image/.test(image.mimetype)) {
            return    errorResponse(res  , new BadRequestError([] ,  "the file should be a valid image !!!" ) ) 
        }
        
      
        image.mv('uploads/' + image.name);
        return 'uploads/' + image.name
    }

}

