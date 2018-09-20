console.log("Hello from wonderworld.js");

//Capture the values from the input form, then store them in an object. 
$("#submit").on("click", function() {
    //the data object stores the values.
    var data = {
        username: $("#userNameInput").val().trim(),
        password: $("#password").val().trim()
    };
    //grab the window
    var currentWindow = window.location.origin;
    //we make sure the fields are not empty
    if (data.username !== "" && data.password !== "") {
        //make the jQuery ajax post to the server to get to the auth route with the data.
        $.post(currentWindow + "/api/auth", data, function(results) {
            console.log("Yes, the path from the jQuery post from wonderworld.js send data ");
            //console.log(data);
            if (results) {
                console.log("We've got results from our ajax post request.");
                //console.log(results);
            }
            //if no match tell the user.
            if (results.matched === false) {
                $("#wrong-username").text(results.textForNoMatch);
                $("#wrong-password").text(results.textForNoMatch);
                setTimeout(function() {
                    $("#wrong-username").text("");
                    $("#wrong-password").text("");
                }, 7000);
            }
        });
    }
    //clear up input values
    $("#userNameInput").val("");
    $("#password").val("");
    return false;
});