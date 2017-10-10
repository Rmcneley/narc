// an array of selected attributes
function getSelectedCheckedBox(form) {

  var chx = [];
  var input = form.getElementsByTagName('input');
  var len = input.length;
  var y = document.getElementById('mytext').value;
  var x = document.getElementById('changeme').value = y;

  for (var i = 0; i < len; i++) {
    if (input[i].type == 'checkbox' && input[i].checked == true) {
      chx.push(input[i].value);
    }

  }
  return chx;
}

//disables checkboxes after 5

jQuery(function() {
  var limit = 5;
  var checked = $('input[type="checkbox"]');

  checked.change(function() {
    var count = checked.filter(':checked').length;
    checked.filter(':not(:checked)').prop('disabled', count >= limit);

  });
});

//hides text box until other is checked

jQuery(document).ready(function($) {
  $('input.uservar').change(function() {
    if ($(this).is(':checked'))
      $(this).next('div.custom_input').show();
    else
      $(this).next('div.custom_input').hide();
  }).change();
});

//submit button
//instead of alert send it to the back-end
document.getElementById('submit').onclick = function() {
  var chx = getSelectedCheckedBox(this.form);
  alert(chx);
}
