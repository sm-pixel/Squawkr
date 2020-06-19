//submit button
 $(document).ready( function () {
    console.log("connected");
    // let bioBox= $("#bio");

    //Hide the error label
    $("#signuperror").hide()
    
    //When you submit the create account form
    $(".create-form").submit( function (event) {
        event.preventDefault();
        console.log('submitted')
        //Grab all of the info in holder variables
        var name = $("#name").val().trim()
        var username = $("#username").val().trim()
        var password = $("#password").val()
        var email = $("#email").val().trim()
        var bio = $("#bio").val().trim()
        var location = $("#location").val().trim();
        var profilePic = $("#profilePicLink").val().trim();
        //If there's no profile picture, set it to this default variable
        if(profilePic === ''){
            profilePic = 'https://3.bp.blogspot.com/-qDc5kIFIhb8/UoJEpGN9DmI/AAAAAAABl1s/BfP6FcBY1R8/s1600/BlueHead.jpg';
        }
        //Object to hold the info
        var holder = {
            name: name,
            username: username,
            password: password,
            email: email,
            bio: bio,
            location: location,
            profilePic: profilePic
        }
        //Post request passing in the holder object
        $.ajax("/api/signup", {
            type: "POST",
            data: holders
        }).then(function() {
            //Go to the login page
            window.location.replace("/login");
        }).catch(function (err) {
            //if there's an error show the error label
            console.log(err);
            $("#signuperror").show();
        });
    })

    //Character counter for bio on signup page
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
