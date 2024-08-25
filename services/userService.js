
const BadRequestError = require("../errors/BadRequestError.js");
const NotFoundError = require("../errors/NotFoundError.js");
const UnauthorizedError = require("../errors/UnauthorizedError.js");
const models = require("../schema/models.js");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const CONFIG = require('../setting.js');


  async function createUser(email, password ) {
    const hashedpw = await bcrypt.hash(password, 10);
    const user = new models.User({
        email: email ,
        password: hashedpw,
        role:  "guest",
    });
    
    user.save();
   
    if (!user) {
      throw new BadRequestError( [] ,  "bad request");
    }
    return user;
  }

  async function checkToken(email , password) {

    const user = await models.User.findOne({ email: email })
    if (!user) {
      throw new NotFoundError("user not found");
    }
   

      if (bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign({ email, role: user.role }, CONFIG.SECRET_KEY, { expiresIn: '2h' });
        return token;
      } else {
        throw new UnauthorizedError("Authentication failed")
      }

  
  }


const userService = {
    createUser,
    checkToken,

};
module.exports = userService;
