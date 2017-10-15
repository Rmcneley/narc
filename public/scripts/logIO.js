function loginUser() {
    console.log("Logged Out");

    var username = $('#login-name').val();
    var password = $('#login-pass').val();

    dpd.users.login({
      username: username,
      password: password
    }, function(user, err) {
      if (err) {
        alert(err.message || (err.errors && err.errors.title));
        return;
      }
    });
  }

  function logoutUser() {
    console.log("Logged Out");
    dpd.users.logout(function(err) {
      if(err) console.log(err);
    });
  }
