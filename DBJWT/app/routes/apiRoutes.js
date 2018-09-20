//////////////////////////////////////////////////
//Here we handle the requests to our api routes.//
//////////////////////////////////////////////////
console.log("Hello from apiRoutes.js");

//////////////
//Dependency//
//////////////

//We use node's path module. It provides utilities for working with file and directory paths.The path.join() method joins all given path segments together. __dirname specifies the directory name of the current module. Example: running node example.js from /Users/mjr

//console.log(__dirname);
// Prints: /Users/mjr
//console.log(path.dirname(__filename));
// Prints: /Users/mjr


var path = require('path');

//***THIS SECTION IS ONLY ACCESIBLE IF THE AUTHENTICATION IS CONFIRMED***//
module.exports = function(app) {
    //resquest for page one
    app.get("/api/privatePageOne", function(req, res) {
        console.log("Hello from api-routes /privatePageOne");
        res.sendFile(path.join(__dirname + '/../public/views/privateViewOne.html'));
    });
    //request for page two
    app.get("/api/privatePageTwo", function(req, res) {
        console.log("Hello from api-routes /privatePageTwo");
        res.sendFile(path.join(__dirname + '/../public/views/privateViewTwo.html'));
    });

    //Handle 404 page not found. This is 100% "kosher" but I like it.
    app.use(function(req, res) {
        res.sendFile(path.join(__dirname, '/../public/views/notFound.html'));
    });
};