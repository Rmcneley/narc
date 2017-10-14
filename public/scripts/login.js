$(document).ready(function() {

  $('#login-user').click(loginUser);

  function loginUser() {
    var username = $('#login-name').val();
    var password = $('#login-pass').val();

    // Create a user
    dpd.users.login({
        username: username,
        password: password
      }, function(user, err) {
        if (err) {
          alert(err.message || (err.errors && err.errors.title));
          return;
        }
window.location.replace("Profile.html");
    });
  }




$('#logout-user').click(logoutUser);

function logoutUser() {
  var username = $('#login-name').val();
  var password = $('#login-pass').val();


  dpd.users.logout({
      username: username,
      password: password
    }, function(user, err) {
      if (err) {
        alert(err.message || (err.errors && err.errors.title));
        return;
      }
window.location.replace("index.html");
  });
}

});
