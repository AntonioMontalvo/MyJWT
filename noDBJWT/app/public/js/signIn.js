console.log("Hello from signIn.js");

//tell user if username and/or password are incorret


function verifyInputs(username, password) {

}

//this is to capture the values from the input form.
//we store the values on an object 
$("#submit").on("click", function() {
    var data = {
        username: $("#userNameInput").val().trim(),
        password: $("#password").val().trim()
    };
    var currentWindow = window.location.origin;
    //we make sure the fields are not empty
    if (data.username !== "" && data.password !== "") {
        //make the jQuery ajax post to the server we are 
        //trying to get to the auth route and give the data
        $.post(currentWindow + "/api/auth", data, function(results) {
            
            if (results.matched === false) {
                $("#wrong-username").text(results.textForUsername);
                $("#wrong-password").text(results.textForPassword);
                setTimeout(function() {
                    $("#wrong-username").text("");
                    $("#wrong-password").text("");
                }, 7000);
            }
            else {
            	console.log("Hello from the post callback in signIn.js");
            	window.location.href = "/api/privatePageOne";
            }
        });
    }
    //clear up input values
    $("#userNameInput").val("");
    $("#password").val("");
    return false;
});