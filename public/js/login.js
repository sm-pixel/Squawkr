$(document).ready(function () {
    console.log("connected")
    // get references to our forms/inputs
    const loginBuild = $("form.login");
    const usernameInput = $("#username");
    const passwordInput = $("#password");

    //confirm there is username and password entered
    loginBuild.on("submit", function(event) {
        event.preventDefault();
        const memberData = {
            username: usernameInput.val().trim(),
            password: passwordInput.val().trim()
        };
        console.log(memberData)
        if (!memberData.username || !memberData.password) {
            return;
        }

        //If the user is found in database we run this function
        loginMember(memberData.username, memberData.password);
        usernameInput.val("");
        passwordInput.val("");
    });

    //function above does a post to our api/login route andredirects us to the users profile
    function loginMember(username, password) {
        console.log("working")
        $.post("/api/login", {
            username: username,
            password: password
        })
            .then(function () {
                window.location.replace("/home");
            })
            .catch(function (err) {
                console.log(err);
            });
    }
})