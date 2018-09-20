////////////////////
//Our dependencies//
////////////////////
console.log("Hi from authRoutes.js");

//Access the info stored in our database for the signature through the O.R.M. (Object Relational Map);
var orm = require('../configuration/orm.js');
//we also need cookies to send a token
var cookies = require("cookies");
//use JSOn Web Token to create, sigh and verify tokens
var jwt = require("jsonwebtoken");
//
var path = require("path");

///////////////////////////////////////////
//Make the route available for the server//
///////////////////////////////////////////
module.exports = function(app) {
    //first we handle the post request 
    app.post("/api/auth", function(req, res) {
        console.log("Hello from htmlRoutes.js. This is the app.post /api/auth");
        //first let's que the data comming with the body of the request
        var userNameFromRequest = req.body.username;
        var passwordFromRequest = req.body.password;
        //the code below authenticates against the user's data
        orm.searchContact(userNameFromRequest, passwordFromRequest, function(data) {
            //our query to the datav=base comes back as an array with an object inside on index 0. If there is no match for username and password the array is empty. If the length is 0 tell the user the info they provide is incorrect.
            if (data.length === 0) {
                console.log("empty");
                var response = {
                    textForNoMatch: "Username or password is incorrect",
                    matched: false
                };
                res.json(response);
            } else if (data.length === 1) {
                console.log("got stuff");
            }
            //if the length is 1 we have a match
            if (data.length === 1) {
                //the callback brings the data from the orm
                var dbUserName = data[0].user_name;
                var dbPassword = data[0].password;

                var payload = {
                    "username": dbUserName,
                    "password": dbPassword
                };

                //compare the provided info with our database
                if (dbUserName == userNameFromRequest && dbPassword == passwordFromRequest) {
                    console.log("We've got matching username and password");

                    // We use jwt create a web token, using the secret we created in server.js
                    var token = jwt.sign(payload, app.get('jwtSecret'), {
                        expiresIn: 30 // Token is given but will expire in 30 seconds (requiring a re-login)
                    });

                    //Now that we have the jwt token we'll send it to the user with a cookie. Now every time the user wants to go to another part of the site the server can verify with the token in the cookie the clearance.

                    new cookies(req, res).set("verification_cookie", token, {
                        http: true,
                        secure: false
                    });

                    res.json({
                        success: true,
                        message: "Access granted. User verification complete."
                    });

                }
            }
        });
    });



    //Now that we've been autheticated we handle all subsequent queries to our API.
    //The Express Application has the app.all() method useful for mapping “global” logic.
    // it requires that all routes from that point on require authentication.
    //Perform a task, then call  next() to continue matching subsequent routes.

    app.all("/api/*", function(req, res, next) {

        //cookies.get( name, [ options ] ). This extracts the cookie with the given name from the Cookie header in the request. If such a cookie exists, its value is returned. Otherwise, nothing is returned.
        var tokenInCookie = cookies(req, res).get("verification_cookie");
        console.log(tokenInCookie);

        //Once we have the token from the verification_cookie we verify with JWT that everything is correct.
        //jwt.verify(token, secretOrPublicKey, [options, callback])
        jwt.verify(tokenInCookie, app.get("jwtSecret"), function(error, decoded) {
            if (error) {
                console.log("This token is NO good. The error is: " + error);
                return res.redirect("/");
            } else {
                console.log("Token has been verified");
                //Because the token is verified we tell the server to move to the API routes with next().
                next();
            }
        });
    });

};