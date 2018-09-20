//////////////////////////////////////////////////////////////////////////
//Tell the server what to do with the html requests. Handle html routes.//
//////////////////////////////////////////////////////////////////////////
console.log("Hi from htmlRoutes.js");

////////////////
//Dependencies//
////////////////

//We use node's path module. It provides utilities for working with file and directory paths. The path.join() method joins all given path segments together. __dirname specifies the directory name of the current module. Example: running node example.js from /Users/mjr
//console.log(__dirname);
// Prints: /Users/mjr
//console.log(path.dirname(__filename));
// Prints: /Users/mjr


var orm = require('../configuration/orm.js');
var path = require('path');

module.exports = function(app) {
    //handle entry page
    app.get("/", function(req, res) {
        res.sendFile(path.join(__dirname + '/../public/views/log-on.html'));
    });
    //for Sign-Up
    app.get("/htmlroutes/sign-up", function(req, res) {
        res.sendFile(path.join(__dirname + '/../public/views/sign-up.html'));
    });
    //through the O.R.M we add new contacts to our database
    app.post('/html/addContact', function(req, res) {
        console.log("Hello from htmlRoutes.js. This is the /html/addContact");
        var contact = req.body;
        orm.addContact(contact, function(data) {
            console.log("This is the data we post with express using the orm through htmlRoutes.js");
            if (data) {
                res.send("Data made it to the database");
            }
        });
    });
};