$(document).ready(() => {
    let squawkBox = $("#squawkBox");
    let squawkSubmit = $("#squawkSubmit");

    squawkSubmit.on('click', (event) => {
        event.preventDefault();
        $.ajax({
            url: '/api/post',
            method: 'POST',
            data: {
                body: squawkBox.val().trim()
            }
        }).then(() => {
            console.log('posted');
            location.reload();
        })
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