
$(document).ready(function() {


  function hideAll() {
    $('#loginDiv').hide();
    $('#signupDiv').hide();
    $('#aboutDiv').hide();
    $('#contactDiv').hide();
    $("#page-content-wrapper").hide();



  }
// Show function
function showDiv(divName) {
  if (divName) {
    hideAll();
    $("#" + divName).show();
  }
}

// Sign Up click event
$('#signup').click(function(){
  $('#signupDiv').modal('show');});

// Log In click event
$('#login').click(function(){
  $('#loginDiv').modal('show');});

// About click event
$("#about").click(function(){showDiv("aboutDiv");});

//contact click event
$("#contact").click(function(){showDiv("contactDiv");});

//image click event
$("#imgbutton").click(function(){
  var fd = new FormData();
  fd.append('name',$('#imgname').val());
  fd.append('image', $('#imgupload')[0].files[0]);

  $.ajax({
    url: 'http://localhost:3000/pictures',
    type: "POST",
    headers: {Authorization: 'Token token=' + localStorage['token']},
    data: fd,
    contentType: false,
    processData: false,
    cache: false
  })
  .done(function(response) {
    console.log(response);
  })
  .fail(function() {
    console.log("error");
  });
});

// reload function event(refresh the page)
$('#landing').click(function(){
  location.reload();
});

// sign up form function and ajax request
$("#signupbutton").click(function(){
  var username = $("#usernameform").val();
  var password = $("#passwordform").val();
  var first_name = $("#firstnameform").val();
  var last_name = $("#lastnameform").val();
  var email = $("#emailform").val();
  var info = {user: {username: username,
    email: email,
    password: password,
    first_name: first_name,
    last_name: last_name}}

    $.ajax({url: 'http://localhost:3000/signup',
      type: "POST",
      contentType: "application/json",
      dataType: "json",
      data: JSON.stringify(info)
    }).done(function(data){
      $('#signupDiv').modal('hide');
    }).fail(function(error){
      console.log('error in login ' + error);
    });
  });

// log in form function and ajax request
$("#loginbutton").click(function(){
  var email = $("#emailformer").val();
  var password = $("#passwordformer").val();

  $.ajax({ url: 'http://localhost:3000/login',
    type: "POST",
    contentType: "application/json",
    dataType: "json",
    data: JSON.stringify({
      credentials: {
        email: email,
        password: password
      }
    })
  }).done(function(data){
    $('#loginDiv').modal('hide');
    renderUserData(data);
    localStorage.setItem('token', data.token);
    $('#buttonnav').show();
    $('#userDiv').show();


// getUserPicAjax(data.id);
}).fail(function(error){
  console.log('error in login ' + error);
});
});

// Display all pics from the user
$("#displaybutton").click(function(){
  $.ajax({
    url: 'http://localhost:3000/pictures',
    type: "GET",
    headers: {Authorization: 'Token token=' + localStorage['token']}})
  .done(function(data) {
    renderUserPics(data);
  })
  .fail(function() {
    console.log("error");
  });
});
var deleteUserPic = function(id) {
  $("img[data-id='" + id + "']").remove();
};

// Delete action for selected picture
$("#deletebutton").click(function(){
  var id = localStorage['selectedPic'];
  $.ajax({
    url: 'http://localhost:3000/pictures/' + id,
    headers: {Authorization: 'Token token=' + localStorage['token']},
    type: 'DELETE',
    dataType: 'json'
  })
  .done(function(data) {
    deleteUserPic(id);
    localStorage.removeItem("token");
  })
  .fail(function() {
    console.log("error");
  });

});

// render user data and append to the div
var renderUserData = function(data) {
  $('#welcomename').html("Hello, " + data.name);
  $('#userDiv').html();
}
// render user pics and append to the div
var renderUserPics = function(data) {
  data.pictures.forEach(function(picture){
    $('#userDiv').append(picture.url);
  });
}



// select specific user pic by clicking on pic
$('#userDiv').on('click', '.picture', function(event){
  localStorage.setItem('selectedPic', $(this).data('id'));
});



});






