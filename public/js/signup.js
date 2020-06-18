//submit button
 $(document).ready( function () {
    console.log("connected")

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
        var profilePic = $("#profilePicLink").val().trim();
        if(profilePic === '') {
            profilePic = 'https://3.bp.blogspot.com/-qDc5kIFIhb8/UoJEpGN9DmI/AAAAAAABl1s/BfP6FcBY1R8/s1600/BlueHead.jpg'
        }
        var holder = {
            name: name,
            username: username,
            password: password,
            email: email,
            bio: bio,
            location: location,
            profilePic: profilePic
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
 })
