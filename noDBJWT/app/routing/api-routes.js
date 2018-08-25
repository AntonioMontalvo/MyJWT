//here we handle the our api routes.
//Dependency
//We use node's path module. It provides utilities for working with file and directory paths.
//The path.join() method joins all given path segments together.
//Also __dirname specifies the directory name of the current module. 
//Example: running node example.js from /Users/mjr

//console.log(__dirname);
// Prints: /Users/mjr
//console.log(path.dirname(__filename));
// Prints: /Users/mjr

var path = require('path');

module.exports = function(app) {
    
    app.get("/api/privatePageOne", function(req, res) {
    	console.log("Hello from api-routes /privatePageOne");
        res.sendFile(path.join(__dirname + '/../public/views/privateViewOne.html'));
    });

    app.get("/api/privatePageTwo", function(req, res) {
    	console.log("Hello from api-routes /privatePageTwo");
        res.sendFile(path.join(__dirname + '/../public/views/privateViewTwo.html'));
    });
};    