 var Middle = Middle || {};

 var middle = Middle.new;

var token;
$(document).ready(function() {

// // hide all divs
// function hideAll() {
//   $('#loginDiv').hide();
//   $('#signupDiv').hide();
//   $('#aboutDiv').hide();
//   $('#contactDiv').hide();
//   $("#page-content-wrapper").hide();
// }

// show function
// function showDiv(divName) {
//   if (divName) {
//     middle.hideAll();
//     $("#" + divName).show();
//   }
// }

// reload function event(refresh the page)
$('#landing').click(function(){
  location.reload();
});
// Sign Up click event
$('#signup').click(function(){
  $('#signupDiv').modal('show');
});
// Log In click event
$('#login').click(function(){
  $('#loginDiv').modal('show');
});
// About click event
$("#about").click(function(){
  $('#aboutDiv').modal('show');
});
//contact click event
$("#contact").click(function(){
  $('#contactDiv').modal('show');
});
//image click event and ajax request
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
    var token = data.token;
    $('#loginDiv').modal('hide');
    localStorage.setItem('token', data['token']);
    middle.renderUserData(data);

    $('#buttonnav').show();
    $('#userDiv').show();
    $('#comment').show();

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
     $('#userDiv').empty();
    middle.renderUserPics(data);
  })
  .fail(function() {
    console.log("error");
  });
});


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
    middle.deleteUserPic(id);
  })
  .fail(function() {
    console.log("error");
  });
});

// select specific user pic by clicking on pic
$('#userDiv').on('click', '.picture', function(event){
  localStorage.setItem('selectedPic', $(this).data('id'));
  });



// // render user data and append to the div
// var renderUserData = function(data) {
//   $('#welcomename').html("Hello, " + data.name);
//   $('#userDiv').html();
// }
// // render user pics and append to the div
// var renderUserPics = function(data) {
//   data.pictures.forEach(function(picture){
//     $('#userDiv').add(picture.url).prependTo($('#userDiv'));
//   });
// }
// // delete image data with image id
// var deleteUserPic = function(id) {
//   $("img[data-id='" + id + "']").remove();
// };


});

