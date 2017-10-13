$(document).ready(function() {

  $('#add-user').click(addUser);

  function addUser() {
    var username = $('#user-name').val();
    var password = $('#user-pass').val();
    var email = $('#user-email').val();

    // Create a user
    dpd.users.post({
      username: username,
      password: password,
      email: email,
      profilepic:'defaultprofilepic.png'
    }, function(user, err) {
      if (err) {
        alert(err.message || (err.errors && err.errors.title));
        return;
      }
    });

    window.location.replace("index.html");
    return false;
  }

});
