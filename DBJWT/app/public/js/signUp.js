console.log("Hello from signUp.js");

//Capture the values from the input form, then store them in an object. 
$("#submit").on("click", function() {
    //the data object stores the values.
    var data = {
        username: $("#userNameInput").val().trim(),
        password: $("#password").val().trim(),
        email: $("#email").val().trim()
    };
    //grab the window.
    var currentWindow = window.location.origin;
    //we make sure the fields are not empty.
    if (data.username !== "" && data.password !== "" && data.phone !== "") {
        //make the jQuery ajax post to the server to get to the html route with the data.
        $.post(currentWindow + "/html/addContact", data, function(results) {
            if(results){
                console.log("Congratulations, you are now in the database");
                window.location.href = currentWindow + "/";
            } else {
                console.log("Your info didn't get to the database");
            }
        });
    }
    //clear up input values
    $("#userNameInput").val("");
    $("#password").val("");
    $("#email").val("");
    return false;
});