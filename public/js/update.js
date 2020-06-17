$(document).ready( function () {
    console.log("connected")

    $("#signuperror").hide()
    $(".create-form").submit( function (event) {
        event.preventDefault();
        console.log('submitted')
        var name = $("#name").val().trim()
        var password = $("#password").val()
        var bio = $("#bio").val().trim()
        var location = $("#location").val().trim();
        var holder = {
            name: name,
            password: password,            
            bio: bio,
            location: location
        }
        $.ajax("/api/update", {
            type: "PUT",
            data: holder

        }).then(function () {
            console.log("updated");
            // window.location.replace("/profile");
            $.ajax({url: "/logout", method: "GET"}).then(() =>{
                window.location.replace("/login")
            }
            )
        }).catch(function (err) {
            console.log(err);
            // $("#signuperror").show();
        });
    })
    $("#logoutButton").on("click", (event) => {
        event.preventDefault();
        $.ajax({
            url: '/logout',
            method: 'GET'
        }).then(() => {
            console.log('asdf');
            location.replace('/');
        })
    })
 })