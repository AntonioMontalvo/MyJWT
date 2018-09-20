////////////////
//Dependencies//
////////////////

var express = require("express");
var bodyParser = require("body-parser");

var jwt = require("jsonwebtoken");//This is the JSON WEB TOKEN for Authentication

/////////////////////////
//Express configuration//
/////////////////////////

var app = express();//The app object conventionally denotes the Express application. app has methods.
var PORT = process.env.PORT || 3000;

//app.set(name, value) Assigns setting name to value.
//Sets JSON Web Token Secret for Encryption
app.set("jwtSecret", "IAMASECRET"); //"IAMASECRET" is what we use to encrypt our Signature

//app.use([path,] callback [, callback...]) Mounts the specified middleware function or functions at the specified path: the middleware function is executed when the base of the requested path matches path. A route will match any path that follows its path immediately with a “/”. For example: app.use('/apple', ...) will match “/apple”, “/apple/images”, “/apple/images/news”, and so on. Middleware functions are executed sequentially, therefore the order of middleware inclusion is important.
app.use(express.static('app/public'));//Serve static content for the app from the “public” directory in the application directory:
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));


////////////////////////////////////
//Routes for Authentication Routes//
////////////////////////////////////

//The server points to a series of files in order, telling in which order will respond when the user make requests. By placing the auth-routes before api-routes we stop users from going to any api sections if they haven't passed the threshold of auth-routes.

require("./app/routes/htmlRoutes.js")(app);//first we go to the html route
require("./app/routes/authRoutes.js")(app);//any request has always to got through this Authentication route.
require("./app/routes/apiRoutes.js")(app);//this is our api. It will be accesses only after the "./app.routing/auth-routes.js" requirements are satisfied.


////////////////////////////////////////////
//Create the listener and atart the server//
////////////////////////////////////////////

app.listen(PORT, function(){
	console.log("Server started the app. Listening on port: " + PORT);
});
