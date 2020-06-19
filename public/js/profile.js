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

    //When you click update, go to the update page
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

    //When you click the trash button
    $(document).on('click', '.trashButton', (event) => {
      let postId = event.target.attributes[0].value;
      //Create a delete request passing in the post id to delete that post
      $.ajax({
        url: `/api/post/${postId}`,
        method: 'DELETE'
      }).then(() => {
        //Reload the page
        window.location.reload();
      })
    })

    //When you click the login button, logout
    $("#logoutButton").on("click", (event) => {
      event.preventDefault();
      $.ajax({
          url: '/logout',
          method: 'GET'
      }).then(() => {
          location.replace('/');
      })
  })
});