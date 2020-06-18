//submit button
 $(document).ready( function () {
    console.log("connected");
    // let bioBox= $("#bio");

    $("#signuperror").hide()
    $(".create-form").submit( function (event) {
        event.preventDefault();
        console.log('submitted')
        var name = $("#name").val().trim()
        var username = $("#username").val().trim()
        var password = $("#password").val()
        var email = $("#email").val().trim()
        var bio = $("#bio").val().trim()
        var location = $("#location").val().trim();
        var holder = {
            name: name,
            username: username,
            password: password,
            email: email,
            bio: bio,
            location: location
        }
        $.ajax("/api/signup", {
            type: "POST",
            data: holder

        }).then(function () {
            console.log("created new user");
            window.location.replace("/login");
        }).catch(function (err) {
            console.log(err);
            $("#signuperror").show();
        });
    })
    let myBioArea = document.getElementById("bio");
    const remainingCharsText = document.getElementById("bio-remaining");
    const MAX_CHARS = 200;

    myBioArea.addEventListener("input", () =>{
        const remaining = MAX_CHARS - myBioArea.value.length;
        const color = remaining < MAX_CHARS * 0.1 ? "red" : null;
        remainingCharsText.textContent = `${remaining} characters remaining`;
        remainingCharsText.style.color = color;
    })
 })
