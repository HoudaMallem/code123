const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require("body-parser")
const CONFIG = require( './setting.js' );
const router = require( './router.js' );
const fileUpload = require('express-fileupload');
const app = express();



//TODO : handle 500 error cases 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(fileUpload({
   limits: {
      fileSize: 10000000, 
  }
}));
app.use(express.static('public'));

app.use(router)



// server listen 
app.listen(4000, () => {
   console.log('Server started on port 4000');
 });




// mongodb connection 

mongoose.connect(CONFIG.DB_URL);
mongoose.connection.on("error", function(error) {
   console.error("Error in MongoDb connection: " + error);
});

mongoose.connection.on("connected", function() {
   console.log("MongoDB connected!");
});
mongoose.connection.on("reconnected", function() {
   console.log("MongoDB reconnected!");
});
mongoose.connection.on("disconnected", function() {
   console.log("MongoDB disconnected!");
});