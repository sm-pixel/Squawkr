$(document).ready(() => {
    //Holder variables 
    let squawkBox = $("#squawkBox");
    let squawkSubmit = $("#squawkSubmit");
    let charCount = $("#charCount");

    //When you click submit on a squawk
    squawkSubmit.on('click', (event) => {
        event.preventDefault();
        //Send a post request to /api/post passing in the squawk data
        $.ajax({
            url: '/api/post',
            method: 'POST',
            data: {
                body: squawkBox.val().trim()
            }
        }).then(() => {
            //Reload after it's posted
            console.log('posted');
            location.reload();
        })
    })

    //Counts the amount of characters in the squawk box
    squawkBox.on('keyup', () => {
        if(squawkBox.val().length < 151){
            charCount.text(squawkBox.val().length);
        } else {
            
        }
    })

    //When you click the logout button
    $("#logoutButton").on("click", (event) => {
        event.preventDefault();
        //Send a get request to the /logout route
        $.ajax({
            url: '/logout',
            method: 'GET'
        }).then(() => {
            //Go to the login page
            location.replace('/');
        })
    })
})