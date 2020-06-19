$(document).ready(() => {
    //When you click logout
    $("#logoutButton").on("click", (event) => {
        event.preventDefault();
        $.ajax({
            url: '/logout',
            method: 'GET'
        }).then(() => {
            //Go to the login page
            location.replace('/');
        })
    })
})