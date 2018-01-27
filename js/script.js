//Registers with server new name, email, password
$('#registerbtn').on('click', function(event) {
  $.ajax({
    url:'https://horizons-facebook.herokuapp.com/api/1.0/users/register',
    method: 'POST',
    data: {
      fname: $('#inputFName').val(),
      lname: $('#inputLName').val(),
      email: $('#inputEmail').val(),
      password: $('#inputPassword').val(),
    },
    success: function() {
      $('#register_form').toggleClass('collapse')
      $('#login_form').toggleClass('collapse')
      $('#register_btn').toggleClass('collapse')
      $('#login_btn').toggleClass('collapse')
    },
    error: function(resp) {
      alert(resp.responseText.error);
    }
  })
  event.preventDefault();
})
//Collapses Registration form when clicked
$('#login').on('click', function() {
  $('#register_form').toggleClass('collapse')
  $('#register_btn').toggleClass('collapse')
  $('#login_btn').toggleClass('collapse')
  $('#login_form').toggleClass('collapse')
})

$('#register').on('click', function() {
  $('#register_form').toggleClass('collapse')
  $('#register_btn').toggleClass('collapse')
  $('#login_btn').toggleClass('collapse')
  $('#login_form').toggleClass('collapse')
})
$('#loginreg').on('click', function() {
  $.ajax({
    url:'https://horizons-facebook.herokuapp.com/api/1.0/users/login',
    method: 'POST',
    data: {
      email: $('#loginEmail').val(),
      password: $('#loginPassword').val(),
    },
    success: function(data) {
      $('#login_form').toggleClass('collapse');
      $('#Entrypage').toggleClass('collapse')
      localStorage.setItem('token', data.response.token);
    },
    error: function(resp) {
      alert(resp.responseText.error);
    }
  })
  return false;
})
