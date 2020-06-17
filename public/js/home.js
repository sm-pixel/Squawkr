$(document).ready(() => {
    let squawkBox = $("#squawkBox");
    let squawkSubmit = $("#squawkSubmit");
    let charCount = $("#charCount");

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

    squawkBox.on('keyup', () => {
        if(squawkBox.val().length < 151){
            charCount.text(squawkBox.val().length);
        } else {
            
        }
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