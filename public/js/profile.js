$(document).ready(function() {
    // This file just does a GET request to figure out which user is logged in
    // and updates the HTML on the page
    $.get("/api/user_data").then(function(data) {
      console.log(data)
      $("#username").text('@' + data.username);
      $("#bio").text(data.bio);
      $("#name").text(data.name);
      $("#userLocation").text(" - " + data.location);
      $("#profilePicture").attr('src', data.profilePic)
    });

    $("#updateButton").on("click", (event) => {
      event.preventDefault();
      $.ajax({
        url: '/update',
        method: 'GET'
      }).then(() => {
        console.log("updating...");
        location.replace('/update')
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
});