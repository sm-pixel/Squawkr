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
            window.location.replace("/profile");
            
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