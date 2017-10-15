$(document).ready(function() {

  var check;

  function appendLogin(){
    var l1 = $('<form id="signin" class="navbar-form navbar-right" role="form"><div class="input-group"><span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span><input id="login-name" type="username" class="form-control" name="username" value="" placeholder="User name"></div><div class="input-group"><span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span><input id="login-pass" type="password" class="form-control" name="password" value=""placeholder="Password"></div><button id="login-user" type="submit" class="btn btn-primary" onclick="loginUser()">Login</button></form>')
    $('#logcheck').append(l1);
  }

  function appendLogout(name){
    var l1 = $('<form id="signin" class="navbar-form navbar-right" role="form"><div class="input-group"><h4> Hello '+ name + '!!!&emsp;&emsp;  </h4></div><button id="logout-user" type="submit" class="btn btn-primary" onclick="logoutUser()">Logout</button></form>')
    $('#logcheck').append(l1);
  }

  dpd.users.me(function(me) {
   check = me.username;

   if (check == null){
     appendLogin();
   }
   else {
     appendLogout(check);
   }
  });



});
