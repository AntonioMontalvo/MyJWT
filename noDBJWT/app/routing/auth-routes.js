////////////////////
//Our dependencies//
////////////////////
//we access the info stored in data for the signature
var adminInfo = require("../data/admin.js");
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
        console.log("Hello from the authorization route");
        //first let's que the data comming with the body of the request
        var userNameFromRequest = req.body.username;
        var passwordFromRequest = req.body.password;
        //the code below authenticates against the user's data
        if (adminInfo.username == userNameFromRequest && adminInfo.password == passwordFromRequest) {
            console.log("We've got matching username and password");

            // We use jwt create a web token, using the secret we created in server.js
            var token = jwt.sign(adminInfo, app.get('jwtSecret'), {
                expiresIn: 30 // Token is given but will expire in 1 minute (requiring a re-login)
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

        } else {
            var response = {
                textForUsername: "",
                textForPassword: "",
                matched: false
            };
            //console.log("Incorrect username or password");
            if (adminInfo.username != userNameFromRequest) {
                response.textForUsername = "Username is Incorrect";
            }
            if (adminInfo.password != passwordFromRequest) {
                response.textForPassword = "Password is Incorrect";
            }
            res.json(response);
        }
    });

    //Now that we've been autheticated we handle all subsequent queries to our API.
    //The Express Application has the app.all() method useful for mapping “global” logic.
    // it requires that all routes from that point on require authentication.
    //Perform a task, then call  next() to continue matching subsequent routes.

    app.all("*", function(req, res, next) {

        //cookies.get( name, [ options ] ). This extracts the cookie with the given name from the Cookie header in the request. If such a cookie exists, its value is returned. Otherwise, nothing is returned.
        var tokenInCookie = cookies(req, res).get("verification_cookie");
        console.log(tokenInCookie);

        //Once we have the token from the verification_cookie we verify with JWT that everything is correct.
        //jwt.verify(token, secretOrPublicKey, [options, callback])
        jwt.verify(tokenInCookie, app.get("jwtSecret"), function(error, decoded) {
            if (error) {
                console.log("This token is NO good. The error is: " + error);
                return res.json({
                    success: false,
                    message: "Oops, something went wrong. The token did not get verified."
                });
            } else {
                console.log("Token has been verified");
                //Because the token is verified we tell the server to move to the API routes with next().
                next();
            }
        });
    });
};