let CONFIG = {};

if (process.env.NODE_ENV === "production" || process.env.NODE_ENV === "staging") {
    CONFIG.DB_URL = process.env.DB_URI;
}else{
      
        if (process.env.DB_HOST == "undefined"){
            CONFIG.DB_URL = `mongodb://${process.env.DB_HOST}:${process.env.DB_POST}/${process.env.DB_DATABASE}`
        } else{
            CONFIG.DB_URL = "mongodb://localhost:27017/code123";
        }
           
        
        
 }
CONFIG.SECRET_KEY  = ';jb8YWSPl;M]*Pr';
module.exports = CONFIG;